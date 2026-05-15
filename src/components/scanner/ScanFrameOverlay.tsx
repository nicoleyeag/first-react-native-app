import { StyleSheet, View } from "react-native";

import { appTheme } from "@/src/theme/app-theme";

const CARD_ASPECT = 63 / 88;
const FRAME_WIDTH_RATIO = 0.88;
const CORNER = 26;
const BORDER = 3;

type ScanFrameOverlayProps = {
  width: number;
  height: number;
};

export function ScanFrameOverlay({ width, height }: ScanFrameOverlayProps) {
  if (width <= 0 || height <= 0) {
    return null;
  }

  const frameW = width * FRAME_WIDTH_RATIO;
  const frameH = frameW / CARD_ASPECT;
  const left = (width - frameW) / 2;
  const top = (height - frameH) / 2;
  const dim = "rgba(0,0,0,0.55)";

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.shade, { height: top, backgroundColor: dim }]} />
      <View
        style={[
          styles.shade,
          {
            left: 0,
            top,
            width: left,
            height: frameH,
            backgroundColor: dim,
          },
        ]}
      />
      <View
        style={[
          styles.shade,
          {
            top,
            left: left + frameW,
            right: 0,
            height: frameH,
            backgroundColor: dim,
          },
        ]}
      />
      <View
        style={[
          styles.shade,
          {
            top: top + frameH,
            bottom: 0,
            backgroundColor: dim,
          },
        ]}
      />

      <View style={[styles.cornerTL, { left, top, width: CORNER, height: CORNER }]} />
      <View style={[styles.cornerTR, { left: left + frameW - CORNER, top, width: CORNER, height: CORNER }]} />
      <View
        style={[
          styles.cornerBL,
          { left, top: top + frameH - CORNER, width: CORNER, height: CORNER },
        ]}
      />
      <View
        style={[
          styles.cornerBR,
          {
            left: left + frameW - CORNER,
            top: top + frameH - CORNER,
            width: CORNER,
            height: CORNER,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shade: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  cornerTL: {
    position: "absolute",
    borderLeftWidth: BORDER,
    borderTopWidth: BORDER,
    borderColor: appTheme.colors.text,
  },
  cornerTR: {
    position: "absolute",
    borderRightWidth: BORDER,
    borderTopWidth: BORDER,
    borderColor: appTheme.colors.text,
  },
  cornerBL: {
    position: "absolute",
    borderLeftWidth: BORDER,
    borderBottomWidth: BORDER,
    borderColor: appTheme.colors.text,
  },
  cornerBR: {
    position: "absolute",
    borderRightWidth: BORDER,
    borderBottomWidth: BORDER,
    borderColor: appTheme.colors.text,
  },
});
