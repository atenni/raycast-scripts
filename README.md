<h1 align="center">My Raycast script commands</h1>

<p align="center">
  A collection of Raycast <a href="https://github.com/raycast/script-commands">script commands</a> for personal
  productivity. Mostly written in <a href="https://deno.land/">Deno</a>.
</p>

## Note: `deno` path

The Raycast doesn't support Deno out of the box. To make these script commands work `deno` needs to be accessible on the
**non-login shell path**.

<details>
<summary>Why is this needed?</summary>

From the Raycast [script commands readme](https://github.com/raycast/script-commands#troubleshooting-and-faqs):

> Can I build in a non-login shell?
>
> **We only allow Script Commands that run in a non-login shell in this repository as agreed on in our
> [contribution guidelines](https://github.com/raycast/script-commands/blob/master/CONTRIBUTING.md), due to any
> dependencies.** However, if you need to run your local script as login-shell, you can specify an argument after
> shebang, e.g. `#!/bin/bash -l` for bash. We also append `/usr/local/bin` to `$PATH` variable so you can use your
> local shell commands without any additional steps. If this is not enough, you can always extend `$PATH` by adding
> export `PATH='/some/extra/path:$PATH'` at the top of your script.

</details>

The default installation path for Deno is `~/.deno/bin`. This can be modified by updating the `DENO_INSTALL`
environment variable before installing Deno.

However, if your environment is already set up a less intrusive modification is to simply symlink `~/.deno/bin/deno`
to `/usr/local/bin` as follows:

```bash
# For macOS paths
sudo ln -s /Users/<USER>/.deno/bin/deno /usr/local/bin/deno
```


