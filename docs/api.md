
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
A JSON object with `user` and `email` properties of the registered user:

```json
{"email": "foo@bar", "name": "loremipsum"}
```

#### Error response
A JSON object with an `error` property, containing the error message:

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
A JSON object with a `token` property, containing the login token:

```json
{"token": "supercalifragilisticexpialidocious"}
```

> **Note!** Login tokens are valid for 30 days

#### Error response
A JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|Invalid E-mail/passowrd|auth.login.invalidCredentialsError|

### 🛡️ POST `/api/auth/me`
> 🛡️ **Protected route**
>
> user must be logged in

Returns the user's data from the database, excluding their password.

**Requires a bearer token.**

#### Success response
A JSON object the user data, password excluded.

#### Error response

A JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|No valid token coressponding to an existing user present|protect.tokenValidityError|




## 🛡️ Logs
> 🛡️ **Protected routes**
> 
> All routes under `/api/logs` require proper authentication with a valid bearer token.
> For brevity purposes, this section does not list authentication-related errors, but they will be returned if no valid token exists in a user's request.
>
> For more information, see the [authentication](#authentication) section.


### 🛡️ GET `/api/logs`

Returns an array with the user's daily logs.

#### Success response
A JSON array of objects, each corresponding to a daily entry by the user (see the `POST /api/logs` section for the object's strucutre):

```json
[]
```

#### Error response
*None.*

### 🛡️ POST `/api/logs`

Creates a new entry of a daily log.

Takes the following parameters:

- `date`- a `string` representing the entry's date, as a `YYYY-MM-DD`
- `symptoms`- an `array` of symptoms
Each symptom is an `object` formatted as:
  - `name`- the name of the symptom (`string`). Note that the name is not pattern limitations, but it must be a string
  - `intensity`- how severe the symptom is. A `number` (integer) between 0 and 4 (including)
- `description`- a `string` of symptoms

#### Success response
A JSON object of the created entry:

```json
{
    "date": "2020-03-14",
    "symptoms": [
        {
            "name": "Headache",
            "intensity": 3
        },
        {
            "name": "Nosebleed",
            "intensity": 4
        }
    ],
    "description": "Some description"
}
```

#### Error response
A JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|Document with this date already exists|logs.creationErrorDateExists|

### 🛡️ PUT `/api/logs`

Modifies an existing entry.

Takes the same parameters as [`POST /api/logs`](#%EF%B8%8F-post-apilogs):
- `date` is required
- `symptoms` and `description` are optional. Omitting any will keep their previous value

#### Success response
A JSON object of the updated entry. See [POST § Success response](#success-response-4) for structure.

#### Error response
A JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|Attempting to update a log that doesn't exist|logs.updateErrorDocumentNotFound|
|Cannot update due to invalid request body structure or another reason|logs.updateErrorOther|












### 🛡️ DELETE `/api/logs`

Deletes an entry.

Takes only 1 parameter:
- `date`- same as in [`POST /api/logs`](#%EF%B8%8F-post-apilogs)

#### Success response
A JSON object of the deleted entry. See [POST § Success response](#success-response-4) for structure.

#### Error response
A JSON object with an `error` property, containing the error message:

|Cause|Message|
|-|-|
|Attempting to delete a log that doesn't exist|logs.deleteErrorDateDoesntExist|
|The request is valid but no deletions were made due to some other reason|logs.deleteErrorZeroDeletionUnknown|