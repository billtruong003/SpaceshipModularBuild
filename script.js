document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarLeft = document.getElementById('sidebar-left');
    const sidebarRight = document.getElementById('sidebar-right');

    menuToggle.addEventListener('click', function () {
        sidebarLeft.classList.toggle('collapsed');
        sidebarRight.classList.toggle('collapsed');
    });

    // Function to navigate to other projects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('click', function () {
            navigateToProject(project.textContent);
        });
    });

    function navigateToProject(project) {
        alert("Navigating to: " + project);
    }

    // Unity specific code
    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const fullscreenButton = document.querySelector("#fullscreen-btn");
    const warningBanner = document.querySelector("#unity-warning");

    // Function to show Unity warning
    function unityShowBanner(msg, type) {
        function updateBannerVisibility() {
            warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
        }
        const div = document.createElement('div');
        div.innerHTML = msg;
        warningBanner.appendChild(div);
        if (type === 'error') div.style = 'background: red; padding: 10px;';
        else if (type === 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(() => {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
        updateBannerVisibility();
    }

    const buildUrl = "Build";
    const loaderUrl = buildUrl + "/WebGLVer.loader.js";
    const config = {
        dataUrl: buildUrl + "/WebGLVer.data",
        frameworkUrl: buildUrl + "/WebGLVer.framework.js",
        codeUrl: buildUrl + "/WebGLVer.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "SpaceshipModular",
        productVersion: "0.1",
        showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        container.className = "unity-mobile";
        canvas.className = "unity-mobile";
    } else {
        canvas.style.width = "960px";
        canvas.style.height = "540px";
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
                unityInstance.SetFullscreen(1);
            };
        }).catch((message) => {
            alert(message);
        });
    };

    document.body.appendChild(script);
});
