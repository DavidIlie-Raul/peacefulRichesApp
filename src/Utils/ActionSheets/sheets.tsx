import { registerSheet } from "react-native-actions-sheet";
import ExampleSheet from "./ExampleActionSheet";
import ImageViewerSheet from "./ImageViewerSheet";

registerSheet("attachments-upload-sheet", ExampleSheet);
registerSheet("image-viewer-sheet", ImageViewerSheet);

export {};
