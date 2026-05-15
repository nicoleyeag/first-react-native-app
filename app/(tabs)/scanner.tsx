import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useCallback, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { ScanFrameOverlay } from "@/src/components/scanner/ScanFrameOverlay";
import { ScannerCaptureBar } from "@/src/components/scanner/ScannerCaptureBar";
import { ScannerPermissionGate } from "@/src/components/scanner/ScannerPermissionGate";
import { appTheme } from "@/src/theme/app-theme";

export default function ScannerScreen() {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [torchOn, setTorchOn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<InstanceType<typeof CameraView> | null>(null);
  const lastViewportLayout = useRef({ width: 0, height: 0 });

  const onViewportLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const last = lastViewportLayout.current;
    if (last.width === width && last.height === height) {
      return;
    }
    lastViewportLayout.current = { width, height };
    setViewport({ width, height });
  }, []);

  const openSettings = useCallback(() => {
    void Linking.openSettings();
  }, []);

  const handleCapture = useCallback(async () => {
    const raw = cameraRef.current;
    if (!raw || isCapturing) {
      return;
    }
    setIsCapturing(true);
    try {
      const camera = raw as {
        takePicture?: (options?: { quality?: number }) => Promise<unknown>;
        takePictureAsync?: (options?: { quality?: number; skipProcessing?: boolean }) => Promise<unknown>;
      };
      if (typeof camera?.takePicture === "function") {
        await camera.takePicture({ quality: 0.85 });
      } else if (typeof camera?.takePictureAsync === "function") {
        await camera.takePictureAsync({ quality: 0.85, skipProcessing: true });
      }
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // Preview-only capture; no persistence or recognition yet.
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing]);

  const permissionLoading = permission == null;
  const permissionGranted = permission?.granted === true;
  const canAskAgain = permission?.canAskAgain !== false;

  if (Platform.OS === "web") {
    return (
      <SafeAreaView edges={["top"]} style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.webBody}>
          <Text style={styles.title}>Scan</Text>
          <Text style={styles.subtitle}>
            Camera preview runs on iOS and Android. Open this project in Expo Go on your phone to
            use the scanner.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const showCamera = isFocused && permissionGranted;

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Scan</Text>
        <Text style={styles.subtitle}>Line up a card inside the frame</Text>
      </View>

      <View style={styles.viewport} onLayout={onViewportLayout}>
        {showCamera ? (
          <CameraView
            ref={cameraRef}
            enableTorch={torchOn}
            facing="back"
            flash={torchOn ? "on" : "off"}
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View style={styles.cameraPlaceholder} />
        )}

        {showCamera && viewport.width > 0 && viewport.height > 0 ? (
          <ScanFrameOverlay height={viewport.height} width={viewport.width} />
        ) : null}

        <ScannerPermissionGate
          canAskAgain={canAskAgain}
          isGranted={permissionGranted}
          isLoading={permissionLoading}
          onOpenSettings={openSettings}
          onRequestPermission={() => void requestPermission()}
        />
      </View>

      <ScannerCaptureBar
        isCapturing={isCapturing}
        onCapture={() => void handleCapture()}
        onGalleryPress={() => undefined}
        onToggleTorch={() => setTorchOn((v) => !v)}
        torchOn={torchOn}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: appTheme.colors.background,
  },
  header: {
    paddingHorizontal: appTheme.spacing.md,
    paddingTop: appTheme.spacing.xs,
    paddingBottom: appTheme.spacing.sm,
    gap: appTheme.spacing.xs,
  },
  title: {
    color: appTheme.colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: appTheme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  viewport: {
    flex: 1,
    marginHorizontal: appTheme.spacing.md,
    marginBottom: appTheme.spacing.sm,
    borderRadius: appTheme.radius.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    backgroundColor: appTheme.colors.surfaceMuted,
  },
  cameraPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: appTheme.colors.surfaceMuted,
  },
  webBody: {
    flex: 1,
    paddingHorizontal: appTheme.spacing.lg,
    paddingTop: appTheme.spacing.lg,
    gap: appTheme.spacing.md,
  },
});
