document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline")
    if (timeline) {
        timeline.addEventListener("mouseover", (e) => {
            const target = e.target.closest(".dates");
            if (target) {
                const dates = document.querySelectorAll(".dates");
                dates.forEach(d => {
                    d.classList.remove("hovered");
                    d.classList.add("not-hovered");
                });
                
                target.classList.remove("not-hovered");
                target.classList.add("hovered");
                
                const adders = document.querySelectorAll(".adder")
                adders.forEach(adder => {
                    adder.classList.add("hide")
                })
            }
        });
        
        timeline.addEventListener("mouseout", () => {
            const dates = document.querySelectorAll(".dates");
            dates.forEach(d => {
                d.classList.remove("hovered", "not-hovered");
            });
            const adders = document.querySelectorAll(".adder")
            adders.forEach(adder => {
                adder.classList.remove("hide")
            })
        });
    }
});
