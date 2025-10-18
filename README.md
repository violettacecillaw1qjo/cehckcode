# Sora POS Web Cms

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI](https://nextui.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/heroui-inc/next-pages-template
```

### Install dependencies

```bash
yarn install
```

### Run the development server

```bash
yarn dev
```

## License

Licensed under the [MIT license](https://github.com/heroui-inc/next-pages-template/blob/main/LICENSE).

## Commit types

| Commit Type | Title                    | Description                                                                                                 | Emoji |
| ----------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- | :---: |
| `feat`      | Features                 | A new feature                                                                                               |   ✨   |
| `fix`       | Bug Fixes                | A bug Fix                                                                                                   |   🐛   |
| `docs`      | Documentation            | Documentation only changes                                                                                  |   📚   |
| `style`     | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |   💎   |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |   📦   |
| `perf`      | Performance Improvements | A code change that improves performance                                                                     |   🚀   |
| `test`      | Tests                    | Adding missing tests or correcting existing tests                                                           |   🚨   |
| `build`     | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |   🛠   |
| `ci`        | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |   ⚙️   |
| `chore`     | Chores                   | Other changes that don't modify src or test files                                                           |   ♻️   |
| `revert`    | Reverts                  | Reverts a previous commit                                                                                   |   🗑   |

## Note:

## Extension

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag): Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text
- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport): Automatically finds, parses and provides code actions and code completion for all available imports.
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight): Highlight web colors in your editor
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens): Improve highlighting of errors, warnings and other language diagnostics.
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): Integrates ESLint JavaScript into VS Code.
- [filesize](https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize): Show the current file size in the status bar
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Supercharge Git within VS Code
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost): Display import/require package size in the editor
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense): autocompletes filenames
- [PostCSS Sorting](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-postcss-sorting): sort CSS rules content with specified order
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatter using prettier
- [Sort JSON](https://marketplace.visualstudio.com/items?itemName=Thinker.sort-json): Simple JSON Object and Array sort
- [Sort lines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines): Sorts lines of text
- [SVGR Preview](https://marketplace.visualstudio.com/items?itemName=Godrix.svgr-preview): a visual preview of exported SVG files
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): Intelligent Tailwind CSS tooling for VS Code
- [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=letrieu.turbo-console-log): Automating the process of writing meaningful log messages.
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens): Shows the latest version for each package using code lens

## Commit rules

- Must run `yarn lint` and `yarn format` and `yarn build`
- With file CSS changed, must run: `Cmd+Shift+P` then use `PostCSS Sorting: Run`

## React Hook Group Orders

1. Dependecies
2. Custom hooks: useTranslation, useStore,...
3. useRef
4. useState
5. useEffect
6. useCallback
7. Common hooks: useTableList,....

## React Props Orders

1. Boolean: isMulti, autoComplete,...
2. Other props: width, height, className,...
3. Event Props: onClick, onBlur,...

## Import Orders

```
    import { } from 'some-dependency';

    import { } from '@/enums/*';

    import { } from '@/types/*';

    import { } from '@/constants/*';

    import { } from '@/variables/*';

    import { } from '@/cores/*';

    import { } from '@/services/*';

    import { } from '@/hooks/*';

    import { } from '@/stores/*';

    import { } from '@/utils/*';

    import { } from '@/assets/*';

    import { } from '@/extensions/*';

    import { } from '@/layouts/*';

    import { } from '@/components/*';

    import OutsideModule from '../outside-module';

    import styles from './Comp.module.css';
    import Types from './types.d.ts';

```
