# Course Standards Checker
### *Package Name*: course-standards-checker

This module is built to be used by Brigham Young University - Idaho. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the the [logger](https://github.com/byuitechops/logger) logging functions.

## Purpose

The purpose of this tool is to allow a quick and thorough investigation into every corner of a course for any items, settings, or formatting that does not meet Brigham Young University - Idaho's standards for online courses.

This tool is built and maintained by the Online Learning Technical Operations Development team at Brigham Young University - Idaho. It is under an MIT license.

## How to Install

```
npm install course-standards-checker
```

## Run Requirements

None

## Options

None

## Outputs

None

## Process

The tool will essentially go through each item in canvas (pages, discussions, assignments, module items, etc) and perform a series of 'checks'. If the check is passed, nothing is logged. If the check fails, it is logged for future reference so users know where certain issues exist throughout the course(s).

## Log Categories

Please review the documentation for each file found in the "checks" directory.

## Requirements

Please review the documentation for each file found in the "checks" directory.
