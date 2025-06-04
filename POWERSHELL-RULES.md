# PowerShell Command Rules

## ❌ NEVER USE && in PowerShell Commands

**WRONG (This will NEVER work in PowerShell):**

```bash
git add . && git commit -m "message" && git push
```

**CORRECT PowerShell Syntax:**

```powershell
# Option 1: Use semicolon separator
git add .; git commit -m "message"; git push

# Option 2: Run commands separately (PREFERRED)
git add .
git commit -m "message"
git push origin branch-name
```

## PowerShell vs Bash/Linux Differences

| Operation             | Bash/Linux             | PowerShell                       |
| --------------------- | ---------------------- | -------------------------------- |
| Command chaining      | `&&`                   | `;`                              |
| Command success       | `command1 && command2` | `command1; if ($?) { command2 }` |
| Environment variables | `$PATH`                | `$env:PATH`                      |
| Directory separator   | `/`                    | `\`                              |

## Why && Fails in PowerShell

PowerShell treats `&&` as a **parsing error**, not a command separator. It will always throw:

```
The token '&&' is not a valid statement separator in this version.
```

## Best Practice for This Project

**Always run git commands separately:**

```powershell
git add .
git commit -m "descriptive message"
git push origin branch-name
```

This is more reliable and easier to debug if one command fails.
