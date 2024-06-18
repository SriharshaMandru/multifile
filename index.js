const fileList = document.querySelector(".file-list");
const fileBrowseButton = document.querySelector(".file-browse-button");
const fileBrowseInput = document.querySelector(".file-browse-input");
const fileUploadBox = document.querySelector(".file-upload-box");

const createFileHTML = (file, uniqueIdentifier) => {
    const {name,size}=file;
    const extension = name.split(".").pop();

    return `<li class="file-item" id="file-item-${uniqueIdentifier}>
                <div class="file-extension">${extension}</div>
                <div class="file-content-wrapper">
                    <div class="file-content">
                        <div class="file-details">
                            <h5 class="file-name">${name}</h5>
                            <div class="file-info">
                                <small class="file-size">4 mb/${size}</small>
                                <small class="file-divider">.</small>  
                                <small class="file-status">Uploading....</small>
                            </div>
                        </div>
                        <button class="cancel-button">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                    <div class="file-progress-bar">
                        <div class="file-progress"></div>
                    </div>
                </div>
            </li>`
}

const handleFileUploading = (file, uniqueIdentifier) =>{
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file",file);
    
    xhr.upload.addEventListener("progress",(e)=>{
        const fileProgress = document.querySelector(`#file-item-${uniqueIdentifier}.file-progress`);
        const fileSize = document.querySelector(`#file-item-${uniqueIdentifier}.file-size`);
        
         const progress = Math.round((e.loaded / e.total)*100);
         fileProgress.style.width = `${progress}%`;
         fileSize.innerText = `${e.loaded}/${e.total}`;
    });

    xhr.open("POST","api.php",true);
    xhr.send(formData);
}

const handleSelectedFiles = ([...files]) => {
    if(files.length === 0) return;

    files.forEach((file, index) => {
        const uniqueIdentifier = Date.now()+index;
          const fileItemHTML = createFileHTML(file, uniqueIdentifier); 
          fileList.insertAdjacentHTML("afterbegin",fileItemHTML);
          
          handleFileUploading(file, uniqueIdentifier);
    });
}

fileUploadBox.addEventListener("drop",(e) => {
    e.preventDefault();
    handleSelectedFiles(e.dataTransfer.files);
    fileUploadBox.classList.add("active");
    fileUploadBox.querySelector(".file-instruction").innerText = "Release to upload or";
});
fileUploadBox.addEventListener("dragleave",(e) => {
    e.preventDefault();
    fileUploadBox.classList.remove("active");
    fileUploadBox.querySelector(".file-instruction").innerText = "Drag files here";
});


fileBrowseInput.addEventListener("change",(e) => handleSelectedFiles(e.target.files));
fileBrowseButton.addEventListener("click",()=>fileBrowseInput.click());