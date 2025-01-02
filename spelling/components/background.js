const bg = document.querySelector(".bg")
const stars = bg.querySelectorAll(".star")

stars.forEach((star,index)=>{
    index +=1
    star.style.backgroundImage = `url("../assests/img_spelling/img_bg/star${index}.png")`
    star.style.backgroundSize = "cover"
    star.style.animationDelay=`${index}s`
})