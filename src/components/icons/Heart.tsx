const Heart = ({ fill, regular, ...props }: any) => {
  if (regular)
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
        <path d="M310.3 108.6L257.3 167.2L201.1 109C167.2 73.77 113.2 71.03 81.21 98.88L80.94 99.12C39.31 134.8 37.21 198.7 74.21 237.1L74.24 237.1L256.4 424.1L263.2 417.9C268.1 434.7 275.5 450.4 284.9 464.6L279.4 470.3C266.4 483.2 245.5 483.2 233.5 470.3L39.71 270.5C-16.22 212.5-13.23 116.6 49.7 62.68C98.77 19.96 171.8 23.55 222.2 62.93C227.2 66.83 231.1 71.08 236.5 75.67L256.4 96.64L275.4 75.67C280.1 70.91 285 66.51 290.2 62.5C340.4 23.53 412.5 20.11 463.2 62.68C506.1 100.1 520.7 157.6 507 208.7C492.7 201.1 477.3 197.1 461.2 194.4C469.4 160.9 459.7 123.5 432 99.16C397.6 70.61 344.6 74.22 310.3 108.6zM576 368C576 447.5 511.5 512 432 512C352.5 512 288 447.5 288 368C288 288.5 352.5 223.1 432 223.1C511.5 223.1 576 288.5 576 368zM476.7 324.7L416 385.4L387.3 356.7C381.1 350.4 370.9 350.4 364.7 356.7C358.4 362.9 358.4 373.1 364.7 379.3L404.7 419.3C410.9 425.6 421.1 425.6 427.3 419.3L499.3 347.3C505.6 341.1 505.6 330.9 499.3 324.7C493.1 318.4 482.9 318.4 476.7 324.7H476.7z" />
      </svg>
    );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" {...props}>
      <path
        className="icon-secondary"
        d="M507 208.7C484.3 198 458.8 192 432 192C334.8 192 256 270.8 256 368C256 403.7 266.6 436.9 284.9 464.6L279.4 470.3C266.4 483.2 245.5 483.2 233.5 470.3L39.71 270.5C-16.22 212.5-13.23 116.6 49.7 62.68C103.6 15.73 186.5 24.72 236.5 75.67L256.4 96.64L275.4 75.67C325.4 24.72 407.3 15.73 463.2 62.68C506.1 100.1 520.7 157.6 507 208.7z"
      />
      <path
        className="icon-primary"
        style={{
          transform: `rotate(${fill ? 0 : 135}deg)`,
          transformOrigin: '75% 72%',
          transition: 'all 0.3s ease',
        }}
        d="M576 368C576 447.5 511.5 512 432 512C352.5 512 288 447.5 288 368C288 288.5 352.5 224 432 224C511.5 224 576 288.5 576 368zM468.7 308.7L432 345.4L395.3 308.7C389.1 302.4 378.9 302.4 372.7 308.7C366.4 314.9 366.4 325.1 372.7 331.3L409.4 368L372.7 404.7C366.4 410.9 366.4 421.1 372.7 427.3C378.9 433.6 389.1 433.6 395.3 427.3L432 390.6L468.7 427.3C474.9 433.6 485.1 433.6 491.3 427.3C497.6 421.1 497.6 410.9 491.3 404.7L454.6 368L491.3 331.3C497.6 325.1 497.6 314.9 491.3 308.7C485.1 302.4 474.9 302.4 468.7 308.7V308.7z"
      />
    </svg>
  );
};

export default Heart;
