exports.loading = `
  <svg style="width: 100%; height: 100%;" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
    <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
      <circle cx="22" cy="22" r="6" stroke-opacity="0">
        <animate attributeName="r"
              begin="1.5s" dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-opacity"
              begin="1.5s" dur="3s"
              values="1;0" calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-width"
              begin="1.5s" dur="3s"
              values="2;0" calcMode="linear"
              repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="22" r="6" stroke-opacity="0">
        <animate attributeName="r"
              begin="3s" dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-opacity"
              begin="3s" dur="3s"
              values="1;0" calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-width"
              begin="3s" dur="3s"
              values="2;0" calcMode="linear"
              repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="22" r="8">
        <animate attributeName="r"
              begin="0s" dur="1.5s"
              values="6;1;2;3;4;5;6"
              calcMode="linear"
              repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
  `


exports.download = `
  <svg height="19px" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg">
    <title/><desc/><defs/>
    <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
      <g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)">
        <g id="file-download" transform="translate(383.000000, 213.500000)">
          <path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/>
        </g>
      </g>
    </g>
  </svg>
  `
