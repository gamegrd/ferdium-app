import { sendAuthRequest } from '../../../api/utils/auth';

class AssistantAPI {
  async publishDebugInfo(): Promise<void> {
    const request = await sendAuthRequest(
      'https://xx/create',
      {
        method: 'POST',
        body: JSON.stringify({}),
      },
      false,
    );

    if (request.status === 200) {
      const response = await request.json();
      if (response.id) {
        console.warn({ log: response.id });
      } else {
        console.warn({ error: true });
      }
    } else {
      console.warn({ error: true });
    }
  }
}

export default AssistantAPI;
