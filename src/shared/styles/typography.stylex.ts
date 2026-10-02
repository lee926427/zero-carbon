import * as stylex from "@stylexjs/stylex";
import { fontSize, fontWeight, lineHeight, tracking } from "./tokens.stylex";
import { media } from "./constants.stylex";

export const typography = stylex.create({
  // 論壇簡介 heading: 32px/1.8, bold
  heading: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.lg,
  },
  toastTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.md,
    letterSpacing: tracking.body,
  },
  // p.topic: 16px/24px (1.5), 1.4px tracking, regular
  paragraph: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.md,
    letterSpacing: tracking.body,
  },
  // p.time: same metrics as paragraph, but bold
  time: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.md,
    letterSpacing: tracking.body,
  },
  // CTA buttons (e.g. 信用卡報名): 16px bold
  button: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.base,
  },
  // Footer / fine print: 10px/1.5, regular
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.md,
  },
  speaker: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.lg,
  },
  speakerDescription: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.lg,
  },
  copyRight: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.md,
    letterSpacing: tracking.body,
  },
  navigation: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.lg,
  },
  registrationLink: {
    fontSize: {
      default: fontSize.base,
      [media.desktop]: fontSize.lg,
    },
    fontWeight: fontWeight.bold,
  },
});
