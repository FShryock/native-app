import React from 'react';
import Svg, { Circle, ClipPath, Defs, G, Path } from 'react-native-svg';

// VolleyHood mark: Denver skyline net + black-and-white ball.
// Requires: npx expo install react-native-svg   (or: npm i react-native-svg && cd ios && pod install)

const SKY =
  'M24 150 V120 H38 V108 H54 V72 L60 60 L66 72 V100 H74 V84 H92 V96 H100 V64 C100 52 106 46 114 46 C122 46 128 52 128 64 V78 H134 V34 H154 V60 H160 V42 L169 38 L178 42 V70 H186 V56 H204 V82 H212 V72 H232 V96 H240 V88 H262 V104 H272 V116 H296 V150';
const MOUNTAINS =
  'M0 150 L30 118 L52 128 L84 96 L108 116 L140 88 L170 112 L204 84 L236 110 L262 94 L292 120 L320 104 V150 Z';
const NET_H = Array.from({ length: 10 }, (_, i) => `M24 ${32 + i * 12} H296`).join(' ');
const NET_V = Array.from({ length: 22 }, (_, i) => `M${32 + i * 12} 30 V150`).join(' ');
const BALL_SEAMS =
  'M20 140 C120 138 200 178 255 255 M255 255 C330 232 410 190 475 110 M255 255 C238 340 244 430 272 512';
const BALL_STRIPES =
  'M112 42 C200 72 300 140 340 228 M262 4 C332 40 398 100 414 186 M102 160 C56 212 30 300 30 382 M192 204 C132 262 120 380 142 478 M244 340 C340 340 440 300 510 238 M246 436 C332 446 420 420 478 378';

export const VH_COLORS = {
  navy: '#0E1322',
  orange: '#E8621A',
  blue: '#378ADD',
  purple: '#534AB7',
  cream: '#F4F1EC',
};

type Props = {
  /** Width in points. Height follows the 320:195 aspect ratio. */
  width?: number;
  /** Color of the dashed ball arc. */
  accent?: string;
  /** Skyline, net posts and baseline color. */
  lineColor?: string;
};

let uid = 0;

export default function VolleyHoodMark({
  width = 160,
  accent = VH_COLORS.orange,
  lineColor = VH_COLORS.cream,
}: Props) {
  // unique clip ids so several marks can render on one screen
  const ids = React.useMemo(() => {
    uid += 1;
    return { sky: `vhSky${uid}`, ball: `vhBall${uid}` };
  }, []);
  const height = (width * 195) / 320;

  return (
    <Svg width={width} height={height} viewBox="0 8 320 195" accessibilityLabel="VolleyHood">
      <Defs>
        <ClipPath id={ids.sky}>
          <Path d={`${SKY} Z`} />
        </ClipPath>
        <ClipPath id={ids.ball}>
          <Circle cx={256} cy={256} r={248} />
        </ClipPath>
      </Defs>

      <Path d={MOUNTAINS} fill={VH_COLORS.purple} fillOpacity={0.55} />
      <G clipPath={`url(#${ids.sky})`}>
        <Path d={NET_H} stroke={VH_COLORS.blue} strokeWidth={1.6} strokeOpacity={0.9} fill="none" />
        <Path d={NET_V} stroke={VH_COLORS.blue} strokeWidth={1.6} strokeOpacity={0.9} fill="none" />
      </G>
      <Path d={SKY} fill="none" stroke={lineColor} strokeWidth={5} strokeLinejoin="round" />
      <Path d="M24 150 H296" stroke={lineColor} strokeWidth={3} />
      <Path d="M24 120 V200 M296 116 V200" stroke={lineColor} strokeWidth={6} strokeLinecap="round" />
      <Path
        d="M40 60 Q150 -30 250 26"
        fill="none"
        stroke={accent}
        strokeWidth={2.5}
        strokeDasharray="3 7"
        strokeLinecap="round"
      />

      <G transform="translate(262 28) scale(0.074) translate(-256 -256)">
        <Circle cx={256} cy={256} r={248} fill="#FFFFFF" />
        <G clipPath={`url(#${ids.ball})`}>
          <Path d={BALL_SEAMS} stroke="#111111" strokeWidth={16} strokeLinecap="round" fill="none" />
          <Path d={BALL_STRIPES} stroke="#111111" strokeWidth={22} strokeLinecap="round" fill="none" />
        </G>
        <Circle cx={256} cy={256} r={242} fill="none" stroke="#111111" strokeWidth={14} />
      </G>
    </Svg>
  );
}
