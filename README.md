# MMM-WordClock-Native

Native WordClock module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror).

![MMM-WordClock-Native Screenshot](screenshots/MMM-WordClock-Native.png)

## Features

- fully local
- no iframe
- no jQuery
- no external runtime dependencies
- no npm dependencies
- German word clock with 10 x 11 character matrix
- four minute dots
- correct `EIN UHR` display at 01:00 and 13:00
- bundled Barlow Semi Condensed font
- native MagicMirror² module implementation

## Installation

Clone the repository into your MagicMirror modules directory:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/frankturban/MMM-WordClock-Native.git
```

No additional npm installation is required.

## Configuration

Add the module to your `config/config.js`:

```javascript
{
    module: "MMM-WordClock-Native",
    position: "middle_center",
    config: {
        size: "960px",
        inactiveOpacity: 0.10
    }
},
```

## Configuration options

| Option | Description | Example |
|---|---|---|
| `size` | Width of the WordClock | `"960px"` |
| `inactiveOpacity` | Opacity of inactive letters | `0.10` |

## Files

```text
MMM-WordClock-Native/
├── MMM-WordClock-Native.js
├── MMM-WordClock-Native.css
├── README.md
├── NOTICE.md
├── LICENSE
├── screenshots/
│   └── MMM-WordClock-Native.png
└── fonts/
    ├── BarlowSemiCondensed-Regular.woff2
    └── OFL-Barlow.txt
```

## Font

This module includes:

**Barlow Semi Condensed Regular**

The font is licensed under the **SIL Open Font License 1.1**.

See:

```text
fonts/OFL-Barlow.txt
```

## License

The module source code is licensed under the **MIT License**.

See:

```text
LICENSE
```

The bundled Barlow font remains licensed separately under the SIL Open Font License 1.1.

## Background

MMM-WordClock-Native was created as a native, locally operated replacement for an older WordClock implementation that relied on technologies such as iframe, jQuery and additional reconstructed web assets.

The native version removes these runtime dependencies and integrates directly into MagicMirror².
