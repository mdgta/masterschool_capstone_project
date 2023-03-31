
# API

## TLl;DR
| Method | Path | Use |
|-|-|-|
| `POST` | `/api/auth/register` | Creating account |
| `POST` | `/api/auth/login` | Logging in |
| `POST` | `/api/auth/me` | Logged-in user's info |
| `GET` | `/api/logs` | Get my logs |
| `POST` | `/api/logs` | Add log |
| `PUT` | `/api/logs` | Edit log |
| `DELETE` | `/api/logs` | Delete log |
| `GET` | `/api/symptoms/` | Get custom list of symptoms |
| `PUT` | `/api/symptoms/` | Update the list of symptoms |
| `POST` | `/api/symptoms/reset` | Reset own custom symptom list |

## Errors
> **Error messages are saved in the [`strings.json`](../backend/util/strings.json) file**
>
> For brevity of the docs, errors are presented by their respective error string, and not the actual message. You can refer back to the `strings.json` file to see the full message.

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
- `symptoms`- an `array` of "*scaledSymptoms*" **(named so just to prevent confusion with the plain, "unscaled" symptom objects)**
  Each *scaledSymptoms* is an `object` containing the following properties:
  - `intensity`- how severe the symptom is. A `number` (integer) between 1 and 3 (including)
  - `symptom`- a `symptom` object- see [Symptom structure](#symptom-structure) for more info
- `description` (optional)- a `string` for a short description
> **Note:** while a *scaledSymptom* object in the `symptoms` array, and the `color` of the symptom objects themselves, both contain a number range (1-3 and 1-5, respectively), there's no technical reason that requires having them reflect an "intensity" or have a matching value, e.g.:
> ```json
> {"symptom": {"name": "Headache", "color": "r4"}, "intensity": 1}
> ```
> i.e., in the example above, the `color` has a value with a saturation of `4`, while the symptom entry's intensity is `1`.

#### Success response
A JSON object of the created entry:

```json
{
    "date": "2020-03-14",
    "symptoms": [
        {
            "symptom": {
                "name": "Headache",
                "color": "r1"
            },
            "intensity": 3,
        },
        {
            "symptom": {
                "name": "Nosebleed",
                "color": "b3"
            },
            "intensity": 1,
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

## 🛡️ Symptoms
> 🛡️ **Protected routes**
>
> All routes under `/api/symptoms` require proper authentication with a valid bearer token.
> For brevity purposes, this section does not list authentication-related errors, but they will be returned if no valid token exists in a user's request.
>
> For more information, see the [authentication](#authentication) section.

> **Important note!**
>
> The routes under `/api/symptoms` are responsible for handling the **user's custom presets of available list of symptoms**. Therefore, unlike routes in `/api/logs`, the plain symptom data does not include the `intensity` property, which is exclusively used for entries

> **Database info**
>
> `/api/symptoms` routes do not implement full CRUD functionality: the backend treats every user as if they have an existing symptoms preset, and if one does not exist, it will be created first. And each time, the only part exposed to the user is the actual symptoms array, and not the full object that associates a given collection document to a particular user. Therefore it is possible to set one's symptoms to an empty array, but not actually deleting it.

### Symptom structure
Symptoms are structured in the following way:
```json
{
  "name": "Headache",
  "color": "r3"
}
```
Where:
  - `name`- the name of the symptom (`string`). Note that the name has not pattern limitations, but it must be a string
  - `color`- a `string` representing a color value (see [color](#color) section)

#### `color`
A `color` is a string, structured as `<color name><saturation>`, e.g. `blue1`.

In the table below, the left column represents the available color names (red, orange, yellow, green, blue and violet, respectively), and the other rows represent the intensity value:

|Color|1|2|3|4|5|
|-|-|-|-|-|-|
|r|#FCC|#FBB|#FAA|#F99|#F88
|o|#FFC|#FFB|#FFA|#FF9|#FF8
|y|#CFC|#BFB|#AFA|#9F9|#8F8
|g|#CFF|#BFF|#AFF|#9FF|#8FF
|b|#CCF|#BBF|#AAF|#99F|#88F
|v|#FCF|#FBF|#FAF|#F9F|#F8F

### Defaults
For every account, the defaults:
- [`symptoms.json`](../backend/data/symptoms.json)

### 🛡️ GET `/api/symptoms`
Returns an array the user's symptom presets.

#### Success response
A JSON array of objects, each corresponding to a symptom:

```json
[
  {"name": "Headache", "color": "r3"},
  {"name": "Nosebleed", "color": "b5"}
]
```

#### Error response
*None.*

### 🛡️ PUT `/api/symptoms`
Sends a new array of symptoms (the array needs to be sent as the request body).

#### Success response
The new array of symptoms.

#### Error response
|Cause|Message|
|-|-|
|Request body is not an array|symptoms.updateNoSymptomsProvided|
|One or ore of the symptoms in the array don't contain a name/valid color|symptoms.updateInvalidStructure|

### 🛡️ POST `/api/symptoms/reset`
Resets the user's custom symptoms and reloads.

#### Success response
A JSON array of the default symptoms.

#### Error response
*None.*