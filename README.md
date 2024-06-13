# Extra-Knot

```
    ______     __             __ __             __
   / ____/  __/ /__________ _/ //_/____  ____  / /_
  / __/ | |/_/ __/ ___/ __ `/ ,<  / __ \/ __ \/ __/
 / /____>  </ /_/ /  / /_/ / /| |/ / / / /_/ / /_
/_____/_/|_|\__/_/   \__,_/_/ |_/_/ /_/\____/\__/

```

CLI utility designed for extracting comment notes from your codebase and save it to a markdown file.

Supporting file extensions: js, jsx, ts, tsx, css, scss, sass, html

The accepted pattern for comment notes is:

```
NOTE(n)[n]:[#] note text
```

Optional parameters:

- `(n)` - specifies a note number.
- `[n]` - specifies the number of code lines to be appended under the note text (default is the number of lines from the line after the note until the first empty line; use 0 to remove the code block).
- `[#]` - dash "-" will be omitted in prepared note text if a note starts with "#"
