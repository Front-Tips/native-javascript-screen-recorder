/* Original `Louis Lazaris` Code 
https://codepen.io/impressivewebs/pen/oNVbwdO */

const btn = document.querySelector("button");

btn.addEventListener("click", async () => {
  // 1️⃣ Request access to the display
  // media (screen, window, tab, etc.)
  const mediaStream =
    await navigator.mediaDevices.getDisplayMedia();

  // 2️⃣ Create a MediaRecorder instance
  // for the obtained media stream
  const mediaRecorder = new MediaRecorder(
    mediaStream
  );

  // 3️⃣ Start recording
  mediaRecorder.start();

  // 4️⃣ Get the video track from the media stream
  const [videoTrack] =
    mediaStream.getVideoTracks();

  // Add an 'ended' event listener
  // to the video track
  videoTrack.addEventListener("ended", () => {
    // 5️⃣ Stop the media recorder
    // when the video track ends
    mediaRecorder.stop();
  });

  // Add a 'dataavailable' event listener
  // to the media recorder
  mediaRecorder.addEventListener(
    "dataavailable",
    (event) => {
      // 6️⃣ Prompt the user for a filename
      const fileName = prompt(
        "Enter a name for your download file",
        "capture.webm"
      );

      // 7️⃣ If user provided a filename,
      // create a download link
      if (fileName) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(
          event.data
        );
        link.download = fileName;

        // 8️⃣ Trigger the download
        link.click();
      }
    }
  );
});
