import React from "react";
import { LOGO_MARK } from "@/data/brand";

export default function RevenueLeakAnimation() {
  return (
    <div
      className="revenue-machine-art relative w-full max-w-[530px]"
      data-testid="revenue-leak-animation"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 360"
        className="h-auto w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="machine-flow-gradient" x1="40" y1="180" x2="445" y2="180">
            <stop stopColor="rgb(var(--brand-cyan))" />
            <stop offset=".52" stopColor="rgb(var(--brand-indigo))" />
            <stop offset="1" stopColor="rgb(var(--brand-magenta))" />
          </linearGradient>
          <linearGradient id="machine-panel-gradient" x1="170" y1="112" x2="310" y2="256">
            <stop stopColor="rgb(var(--brand-cyan))" stopOpacity=".16" />
            <stop offset="1" stopColor="rgb(var(--brand-indigo))" stopOpacity=".08" />
          </linearGradient>
          <radialGradient id="machine-glow">
            <stop stopColor="rgb(var(--brand-indigo))" stopOpacity=".36" />
            <stop offset="1" stopColor="rgb(var(--brand-indigo))" stopOpacity="0" />
          </radialGradient>
          <clipPath id="machine-screen-clip">
            <rect x="179" y="125" width="122" height="107" rx="7" />
          </clipPath>
        </defs>

        <circle cx="240" cy="181" r="174" fill="url(#machine-glow)" />
        <circle
          cx="240"
          cy="181"
          r="157"
          stroke="rgb(var(--brand-cyan))"
          strokeOpacity=".12"
          strokeDasharray="2 10"
        />

        <g fill="white" fillOpacity=".5" fontFamily="ui-monospace, monospace" fontSize="8" letterSpacing="1.1">
          <text x="29" y="106">WEBSITE INPUT</text>
          <text x="355" y="106">REVENUE OUTPUT</text>
        </g>
        <g fill="rgb(var(--brand-sky))" fillOpacity=".8">
          <circle cx="21" cy="103" r="2" />
          <circle cx="347" cy="103" r="2" />
        </g>

        <g stroke="url(#machine-flow-gradient)" strokeWidth="1.5" strokeDasharray="4 7" opacity=".78">
          <path className="machine-flow-in" d="M112 173H180" />
          <path className="machine-flow-out" d="M300 173H372" />
        </g>

        <g className="machine-input-sites">
          <rect x="27" y="125" width="67" height="51" rx="4" fill="#0b1530" stroke="rgb(var(--brand-cyan))" strokeOpacity=".55" />
          <path d="M27 137H94" stroke="rgb(var(--brand-cyan))" strokeOpacity=".42" />
          <circle cx="34" cy="131" r="1.5" fill="rgb(var(--brand-magenta))" />
          <circle cx="40" cy="131" r="1.5" fill="rgb(var(--brand-indigo))" />
          <path d="M37 150H81M37 157H71M37 164H77" stroke="white" strokeOpacity=".24" strokeWidth="2" strokeLinecap="round" />
          <rect x="48" y="146" width="13" height="13" rx="2" fill="rgb(var(--brand-cyan))" fillOpacity=".22" />

          <rect x="64" y="185" width="55" height="43" rx="4" fill="#0b1530" stroke="rgb(var(--brand-indigo))" strokeOpacity=".72" />
          <path d="M64 196H119" stroke="rgb(var(--brand-indigo))" strokeOpacity=".5" />
          <circle cx="70" cy="191" r="1.4" fill="rgb(var(--brand-cyan))" />
          <path d="M74 207H108M74 213H99M74 219H105" stroke="white" strokeOpacity=".24" strokeWidth="1.7" strokeLinecap="round" />
        </g>

        <g>
          <rect x="157" y="105" width="166" height="157" rx="14" fill="#091126" stroke="url(#machine-flow-gradient)" strokeOpacity=".78" strokeWidth="1.5" />
          <rect x="166" y="114" width="148" height="139" rx="9" fill="url(#machine-panel-gradient)" stroke="white" strokeOpacity=".12" />
          <circle cx="170" cy="119" r="2" fill="rgb(var(--brand-cyan))" fillOpacity=".8" />
          <circle cx="310" cy="119" r="2" fill="rgb(var(--brand-magenta))" fillOpacity=".8" />
          <path d="M183 244H297" stroke="white" strokeOpacity=".16" />
          <text x="240" y="250" textAnchor="middle" fill="white" fillOpacity=".43" fontFamily="ui-monospace, monospace" fontSize="7" letterSpacing="1.5">TSM NEXUS ENGINE</text>

          <g clipPath="url(#machine-screen-clip)">
            <rect x="179" y="125" width="122" height="107" fill="#0a142b" fillOpacity=".76" />
            <path className="machine-scan" d="M180 153H301" stroke="rgb(var(--brand-cyan))" strokeOpacity=".56" />
            <text className="machine-stage machine-stage-analyze" x="240" y="139" textAnchor="middle" fill="rgb(var(--brand-cyan))" fontFamily="ui-monospace, monospace" fontSize="6" letterSpacing="1">ANALYZING SITE</text>
            <text className="machine-stage machine-stage-convert" x="240" y="139" textAnchor="middle" fill="rgb(var(--brand-magenta))" fontFamily="ui-monospace, monospace" fontSize="6" letterSpacing="1">OPTIMIZING CONVERSION</text>
            <g transform="translate(240 178)">
              <image
                href={LOGO_MARK}
                x="-44"
                y="-44"
                width="88"
                height="88"
                preserveAspectRatio="xMidYMid meet"
              />
            </g>
            <g fill="rgb(var(--brand-cyan))">
              <circle className="machine-spark machine-spark-one" cx="201" cy="142" r="2" />
              <circle className="machine-spark machine-spark-two" cx="279" cy="207" r="2" fill="rgb(var(--brand-magenta))" />
              <circle className="machine-spark machine-spark-three" cx="201" cy="211" r="1.7" fill="rgb(var(--brand-sky))" />
            </g>
          </g>

          <path d="M185 267V280H295V267" stroke="url(#machine-flow-gradient)" strokeOpacity=".55" />
          <path d="M200 280V290M280 280V290" stroke="white" strokeOpacity=".2" />
          <path d="M190 292H290L281 301H199L190 292Z" fill="rgb(var(--brand-indigo))" fillOpacity=".22" stroke="rgb(var(--brand-cyan))" strokeOpacity=".42" />
        </g>

        <g className="machine-output-sites">
          <rect x="373" y="119" width="76" height="69" rx="4" fill="#0b1530" stroke="rgb(var(--brand-magenta))" strokeOpacity=".7" />
          <path d="M373 131H449" stroke="rgb(var(--brand-magenta))" strokeOpacity=".48" />
          <circle cx="380" cy="125" r="1.5" fill="rgb(var(--brand-cyan))" />
          <path d="M383 143H439M383 149H416" stroke="white" strokeOpacity=".22" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M384 178L396 169L406 172L419 153L433 158" stroke="url(#machine-flow-gradient)" strokeWidth="1.5" />
          <circle cx="419" cy="153" r="2" fill="rgb(var(--brand-cyan))" />
          <rect x="383" y="158" width="48" height="12" rx="2" fill="rgb(var(--brand-cyan))" fillOpacity=".1" />
          <text x="388" y="166" fill="white" fillOpacity=".58" fontFamily="ui-monospace, monospace" fontSize="5.5" letterSpacing=".4">CONVERSIONS</text>

          <rect x="363" y="198" width="82" height="36" rx="5" fill="#11152e" stroke="rgb(var(--brand-indigo))" strokeOpacity=".72" />
          <circle cx="379" cy="216" r="8" fill="rgb(var(--brand-cyan))" fillOpacity=".14" stroke="rgb(var(--brand-cyan))" strokeOpacity=".62" />
          <path d="M379 211V216L383 219" stroke="rgb(var(--brand-cyan))" strokeWidth="1.3" strokeLinecap="round" />
          <text x="392" y="213" fill="white" fillOpacity=".62" fontFamily="ui-monospace, monospace" fontSize="5.5" letterSpacing=".4">REVENUE</text>
          <text x="392" y="223" fill="rgb(var(--brand-cyan))" fillOpacity=".9" fontFamily="ui-monospace, monospace" fontSize="7" letterSpacing=".5">GROWING</text>
        </g>

        <g className="machine-flow-particles" fill="rgb(var(--brand-cyan))">
          <circle cx="127" cy="173" r="2.3" />
          <circle cx="145" cy="173" r="1.5" fill="rgb(var(--brand-sky))" />
          <circle cx="335" cy="173" r="2" fill="rgb(var(--brand-magenta))" />
          <circle cx="353" cy="173" r="1.5" fill="rgb(var(--brand-cyan))" />
        </g>
      </svg>
    </div>
  );
}
