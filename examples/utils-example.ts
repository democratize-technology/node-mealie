import { UtilsService } from '../src/services/utils';
import { writeFile } from 'fs/promises';

/**
 * Example of using the UtilsService for file downloads
 */
async function main() {
  // Initialize the service
  const utils = new UtilsService({
    baseUrl: 'https://demo.mealie.io',
    token: 'your-auth-token'
  });

  try {
    // Example 1: Basic file download
    console.log('Downloading file...');
    const fileBlob = await utils.downloadFile();
    console.log('File downloaded successfully');
    
    // Example 2: Download with specific token
    const fileWithToken = await utils.downloadFile({ token: 'special-token' });
    console.log('File downloaded with special token');

    // Example 3: Save file in Node.js environment
    const buffer = await fileBlob.arrayBuffer();
    await writeFile('downloaded-file', Buffer.from(buffer));
    console.log('File saved to disk');

    // Example 4: Handle download in browser environment
    if (typeof window !== 'undefined') {
      const url = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded-file';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('File downloaded in browser');
    }

  } catch (error) {
    console.error('Error downloading file:', error);
    if ('statusCode' in error) {
      console.error('Status code:', error.statusCode);
    }
  }
}

// Run the example
main();
