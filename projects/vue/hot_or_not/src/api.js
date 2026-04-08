const configuredFaceApiUrl = import.meta.env.VITE_FACE_API_URL;

function normalizeRemotePhoto(payload) {
  if (!payload) {
    return null;
  }

  if (typeof payload === "string") {
    return {
      id: payload,
      url: payload
    };
  }

  const url = payload.url || payload.src;

  if (!url) {
    return null;
  }

  return {
    id: payload.id || payload.name || url,
    url
  };
}

export function hasRemoteFaceApi() {
  return Boolean(configuredFaceApiUrl);
}

export async function fetchRemotePhoto() {
  if (!configuredFaceApiUrl) {
    return null;
  }

  const response = await fetch(configuredFaceApiUrl, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Remote face API failed: ${response.status}`);
  }

  const payload = await response.json();
  return normalizeRemotePhoto(payload);
}
