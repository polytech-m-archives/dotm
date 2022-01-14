# dotm
MongoDB HomeWork

DOTM is an CLI tool that helps you to manage your time. You can easily create project and adding new time entry.

## Installation

```bash
git clone https://github.com/polytech-m-archives/dotm
yarn install --save # or npm install --save
```

You need to create a .env file and provide a `MONGODB_URL`. You can also set the environment variable in your shell.

## Fields
#### Time Field:

DOTM makes intelligent guesses, but when you need to you can override them easily by adding m, h, or d to your entry.

| What you enter | How DOTM understands it                                     |
|----------------|-------------------------------------------------------------|
| 15             | 15 minutes                                                  |
| 15m            | 15 minutes                                                  |
| 15h            | 15 hours                                                    |
| 9-5            | 8 hours (literally "nine to five"!)                         |
| y 2h           | 2 hours for yesterday                                       |
| 1:15           | 1 hours, 15 minutes                                         |
| 10 to          | 5 hours (Calculates "10am till now", assuming it's 3pm now) |
| Thurs, 2:45    | 2 hours, 45 minutes on the most recent Thursday             |

### Project Field:	

Should be a String
if a project does not exist, a new project should be created

### Description Field:

This field takes tags and descriptive text. Just like the Project or Client field, it's entirely optional.
Think of the description like a tweet (although DOTM doesn't have a size limit)! The best descriptions are short and to the point, and make use of tags so it's easier to find and group entries later.

## Usage

### Insert command

``` bash
yarn start time project [comment]
```

Insert a new entry into the project with an optional comment

### Get command

``` bash
yarn start get date [project]
```

Sum up all the data and a specified day and a project (if given) give the total amount of time

### Get-hash command

``` bash
yarn start get-hash date [project]
```

Return the total amount of time on the hashtag and a project (if given)

### Report command

``` bash
yarn start report perday [project]
```

Return for each day (where there is a time entry) the total amount of time that has been spent

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and follow Angular instruction for commit name (here).
