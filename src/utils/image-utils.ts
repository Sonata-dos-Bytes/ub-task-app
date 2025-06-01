import * as FileSystem from 'expo-file-system';

export async function saveBase64ToFile(
  base64Data: string,
  filename?: string,
  path: string = 'uploads/',
): Promise<string> {
  const [, data] = base64Data.includes(',')
    ? base64Data.split(',', 2)
    : [null, base64Data];

  let ext = 'jpg';
  const match = base64Data.match(/^data:(image\/\w+);base64,/);
  if (match) {
    const mime = match[1].split('/')[1];
    ext = mime;
  }

  const dir = FileSystem.documentDirectory! + path;
  const info = await FileSystem.getInfoAsync(dir);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }

  const name = filename ?? `${Date.now()}`;
  const fileUri = `${dir}${name}.${ext}`;

  await FileSystem.writeAsStringAsync(
    fileUri,
    data,
    { encoding: FileSystem.EncodingType.Base64 }
  );

  return fileUri;
}
