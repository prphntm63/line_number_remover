console.log("LOADED SCRIPT")

$(function() {
  $('#downloadButton').click(() => {
    console.log("Processing File")
    const fileToLoad = document.getElementById("uploadFile").files[0];
    const fadalMode = document.getElementById("fadalMode").checked

    const fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
      const textFromFileLoaded = fileLoadedEvent.target.result;
        
      const lines = textFromFileLoaded.split("\n")
      const output = lines.map(line => {
        if (fadalMode) {
          return line.replace(/^N?[0-9.]+\s*/, '')
        } else {
          return line.replace(/^\d+\s*/, '');
        }
      })

      const outFileData = output.join("\n")

      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(outFileData));
      element.setAttribute('download', 'PARSED_'+fileToLoad.name);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
  })
})
