(function () {
    // Check if consent has already been given and is still valid (365 days)
    const consentKey = 'Hyna Studio-cookie-consent';
    const savedConsent = localStorage.getItem(consentKey);
    
    if (savedConsent) {
        try {
            const data = JSON.parse(savedConsent);
            const now = new Date().getTime();
            const oneYear = 365 * 24 * 60 * 60 * 1000;
            
            // If the consent is less than a year old, don't show the banner
            if (now - data.timestamp < oneYear) {
                return;
            }
        } catch (e) {
            // If parse fails, clear and prompt again
            localStorage.removeItem(consentKey);
        }
    }

    // Dynamic CSS injection for self-contained deployment
    const styles = `
        /* Overlay container for full screen blur */
        .cookie-consent-overlay {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(10, 10, 15, 0.45);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 999999;
            opacity: 0;
            transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        }

        .cookie-consent-overlay.show {
            opacity: 1;
            pointer-events: auto;
        }

        /* Centered White Professional Card */
        .cookie-banner {
            width: 480px;
            max-width: calc(100vw - 2rem);
            background: #ffffff;
            border: 1px solid #e4e4e7;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 1px rgba(0, 0, 0, 0.1);
            font-family: 'Inter', sans-serif;
            color: #18181b;
            transform: scale(0.95) translateY(20px);
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cookie-consent-overlay.show .cookie-banner {
            transform: scale(1) translateY(0);
        }

        .cookie-consent-overlay.hide {
            opacity: 0;
            pointer-events: none;
        }

        .cookie-consent-overlay.hide .cookie-banner {
            transform: scale(0.95) translateY(20px);
        }

        .cookie-banner-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .cookie-banner-body {
            display: flex;
            gap: 1.25rem;
            align-items: flex-start;
        }

        .cookie-icon-container {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: #f4f4f5;
            border: 1px solid #e4e4e7;
            border-radius: 12px;
            color: #18181b;
        }

        .cookie-text-container {
            flex-grow: 1;
        }

        .cookie-title {
            font-family: 'Syne', sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            color: #18181b;
            letter-spacing: -0.01em;
        }

        .cookie-desc {
            font-size: 0.9rem;
            line-height: 1.5;
            color: #71717a;
            margin: 0;
        }

        .cookie-banner-actions {
            display: flex;
            gap: 0.75rem;
            width: 100%;
        }

        .cookie-btn {
            flex: 1;
            padding: 0.8rem 1.2rem;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            border: none;
            outline: none;
        }

        .cookie-btn-primary {
            background: #18181b;
            color: #ffffff;
            border: 1px solid #18181b;
        }

        .cookie-btn-primary:hover {
            background: #27272a;
            border-color: #27272a;
            transform: translateY(-1px);
        }

        .cookie-btn-primary:active {
            transform: translateY(0);
        }

        .cookie-btn-secondary {
            background: #ffffff;
            border: 1px solid #e4e4e7;
            color: #27272a;
        }

        .cookie-btn-secondary:hover {
            background: #f4f4f5;
            border-color: #d4d4d8;
            color: #18181b;
            transform: translateY(-1px);
        }

        .cookie-btn-secondary:active {
            transform: translateY(0);
        }

        @media (max-width: 576px) {
            .cookie-banner {
                padding: 1.5rem;
                margin: 1rem;
            }
            
            .cookie-banner-body {
                flex-direction: column;
                gap: 1rem;
            }
            
            .cookie-icon-container {
                width: 44px;
                height: 44px;
            }
            
            .cookie-banner-actions {
                flex-direction: column-reverse;
                gap: 0.5rem;
            }
            
            .cookie-btn {
                width: 100%;
                padding: 0.75rem 1.2rem;
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    // Create and append the overlay and banner
    const overlay = document.createElement("div");
    overlay.id = "cookie-consent-overlay";
    overlay.className = "cookie-consent-overlay";
    
    overlay.innerHTML = `
        <div id="cookie-consent-banner" class="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
            <div class="cookie-banner-content">
                <div class="cookie-banner-body">
                    <div class="cookie-icon-container">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                            <path d="M8.5 8.5v.01"></path>
                            <path d="M16 15.5v.01"></path>
                            <path d="M12 12v.01"></path>
                            <path d="M11 17v.01"></path>
                            <path d="M7 14v.01"></path>
                        </svg>
                    </div>
                    <div class="cookie-text-container">
                        <h3 id="cookie-title" class="cookie-title">Privacy Preferences</h3>
                        <p id="cookie-desc" class="cookie-desc">
                            Hyna Studio uses cookies to improve site performance, personalize content, and analyze visitor activity. By clicking 'Accept', you consent to our use of cookies.
                        </p>
                    </div>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-reject" class="cookie-btn cookie-btn-secondary">Reject Non-Essential</button>
                    <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accept All</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Trigger smooth fade-in after a short delay
    setTimeout(() => {
        overlay.classList.add("show");
    }, 1000);

    // Handlers
    const acceptBtn = document.getElementById("cookie-accept");
    const rejectBtn = document.getElementById("cookie-reject");

    function saveChoiceAndHide(choice) {
        const consentData = {
            consent: choice,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(consentKey, JSON.stringify(consentData));

        // Fade out
        overlay.classList.replace("show", "hide");
        
        // Remove element from DOM after transition finishes
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }

    acceptBtn.addEventListener("click", () => saveChoiceAndHide("all"));
    rejectBtn.addEventListener("click", () => saveChoiceAndHide("essential"));
})();
