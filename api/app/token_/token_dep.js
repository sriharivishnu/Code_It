//Deprecated functions
// Not using Token-Based sessions anymore
// Will need these functionalities for API later

function verifyAuth(req, res, next) {
  //Ensure that there is a token in the header
  let token = req.header("Authorization");
  if (!token) return res.status(401).send({ message: "Access Denied: Please login" });
  //Bearer token
  token = token.substring(7);

  //Try verifying the token using the TOKEN SECRET
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.uid = verified;
    next();
  } catch (err) {
    res.status(403).send({ message: "Invalid token!" });
  }
}

/**
 * The endpoint to receive a new access token once its expired. Uses
 * the refresh token to validate user.
 * POST request
 * {
 *    refresh_token : "xxxxxx..."
 * }
 * @param {*} req
 * @param {*} res
 */
exports.token = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(401).send({ error: "No refresh token found!" });

  //--- TODO: Check if refresh token is in the white list

  //---

  //Decode the JWT
  let decoded;
  try {
    decoded = jwt.verify(refresh_token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ error: "Invalid Refresh token!" });
  }
  if (!decoded.uid) return res.status(500).send({ error: "Token has invalid contents" });
  let tokens;

  //Check if refresh token is about to expire - send refresh and access
  if (decoded.exp < Date.now() / 1000 + REPLACE_REFRESH_TOKEN_WHEN_X_SECONDS_AWAY) {
    tokens = createTokens(decoded.uid);
  }

  //Only send back an access token
  else {
    tokens = { access_token: createSessionToken(decoded.uid) };
  }

  return res.status(200).send(tokens);
};

// 1 hour (3600 seconds)
const TOKEN_EXPIRES_IN_SECONDS = 60 * 60;

// 365 Days
const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 365;

// Replace the refresh token when it is a week away from expiry
const REPLACE_REFRESH_TOKEN_WHEN_X_SECONDS_AWAY = 60 * 60 * 24 * 7;

/**
 * Creates just the access token for a user
 * @param {String} uid The UID of the user
 */
function createSessionToken(uid) {
  //Create session token
  const token = jwt.sign({ uid: uid }, process.env.TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN_SECONDS,
  });
  return token;
}

/**
 * Creates an access token and a refresh token
 * @param {String} uid The UID of the user
 */
function createTokens(uid) {
  //Create session token
  const token = createSessionToken(uid);
  //Create the refresh token
  const refresh_token = jwt.sign(
    {
      uid: uid,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN_SECONDS }
  );
  return { access_token: token, refresh_token: refresh_token };
}
