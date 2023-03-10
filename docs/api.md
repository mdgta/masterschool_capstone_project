
# API

## Authentication
### POST `/api/auth/register`

Creates a new account.

> **Note!** This path is for account creation only, *not* for token generation!

Takes the following parameters:

- `email`- an E-mail account. Must be unique
- `user`- account nickname. Must be **case-insensitively** unique, but retains the casing used while registering
  - Must be at least 4 characters long
  - Can only contain English letters (of any case), digits, underscores or minus signs
- `password`- a valid passowrd.
  Password strength is determined by:
  - Must be at least 8 characters long
  - Must not start/end with spaces
  - Must contain at least 1 uppercase letter
  - Must contain at least 1 lowercase letter
  - Does not contain a sequence of 3+ repeating characters
  - Does not contain `abc`, `xyz`, `pass` or `123` (case-insensitive)
  - Not a word ending with 1-2 digits (e.g. `Stephanie12`)
  - Does not contain the string `hunter2` (case-insensitive)
- `confirmPassword`- must match `password`

#### Success response
An JSON object with `user` and `email` properties of the registered user:

```json
{"email": "foo@bar", "name": "loremipsum"}
```

#### Error response
An JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|The POST request is missing some of the required data|auth.register.missingDataError|
|The `password` and `confirmPassword` parameters in the request don't match|auth.register.passwordConfirmError|
|Password too weak|auth.register.passwordWeakError|
|Name too short or contains blacklisted characters|auth.register.nameValidityError|
|Name taken|auth.register.nameTakenError|
|E-mail taken|auth.register.emailTakenError|

### POST `/api/auth/login`
Logs the user in by generating a token.

Takes the following parameters:

- `email`- the user's E-mail account
- `password`- the user's password

#### Success response
An JSON object with a `token` property, containing the login token:

```json
{"token": "supercalifragilisticexpialidocious"}
```

> **Note!** Login tokens are valid for 30 days

#### Error response
An JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|Invalid E-mail/passowrd|auth.login.invalidCredentialsError|

### 🛡️ POST `/api/auth/me`
> 🛡️ **Protected route**
> user must be logged in

Returns the user's data from the database, excluding their password.

**Requires a bearer token.**

#### Success response
An JSON object the user data, password excluded.

#### Error response

An JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|No valid token coressponding to an existing user present|protect.tokenValidityError|