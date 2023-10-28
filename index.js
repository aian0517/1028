const q = document.querySelector.bind(document)
const qa = document.querySelectorAll.bind(document)
gsap.registerPlugin(ScrollToPlugin,ScrollTrigger)
var gsap_media = gsap.matchMedia()


// body1

var body1_swiper = new Swiper('.body1-swiper',{
    slidesPerView:3,
    spaceBetween:10,
    breakpoints:{
        1:{
            slidesPerView:1.5
        },
        1080:{
            slidesPerView:3
        }
    }
})

// body2

var body2_swiper = new Swiper('.body2-swiper',{
    slidesPerView:2,
    breakpoints:{
        1:{
            slidesPerView:1.2
        },
        1080:{
            slidesPerView:2
        }
    }
})
var body2_card_swiper = new Swiper('.body2-card-swiper',{
    grabCursor:true,
    slidesPerView:4,
    spaceBetween:10,
    breakpoints:{
        1:{
            slidesPerView:1.2
        },
        1080:{
            slidesPerView:4
        }
    },
    navigation:{
        nextEl:'.body2-swiper-next',
        prevEl:'.body2-swiper-prev',
    }
})

body2_btn.forEach((item,index)=>{
    body2_swiper.appendSlide(`
    <div class="swiper-slide df jcc aic">
        <div id="${item}" class="eeee ${item === body2_click ?'active':''} ${index === 0 ?'body2-btn':'body2-btn2'}" onclick="body2_btn_click(event)">
            <h1 class="f5 fw">${item}</h1>
        </div>
    </div>
    `)
})
gsap.to('.body2-btn',{
    y:50,
    duration:2,
    yoyo:true,
    repeat:-1,
    ease:'linear'
})
gsap.to('.body2-btn2',{
    y:-50,
    duration:2,
    yoyo:true,
    repeat:-1,
    ease:'linear'
})
function mobile(){
    body2_card_swiper.removeAllSlides()
    mobile_data[body2_click].forEach((item,index)=>{
        body2_card_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="card body2-card">
                <img src="${item.img}" alt="" class="card-img-top body2-card-img">
                <div class="card-body">
                    <h1 class="card-title body2-card-title fw f5 text-center">${item.title}</h1>
                    <p class="f6 card-text body2-card-text">${item.text}</p>
                </div>
            </div>
        </div>
        `)
    })
    var g = gsap.timeline()
    g.to('.body2-card-swiper',{
        autoAlpha:0,
        duration:.3,
        ease:'linear'
    })
    g.fromTo('.body2-card-swiper',{autoAlpha:0},{
        autoAlpha:1,
        duration:.3,
        ease:'linear'
    })
}
function body2_btn_click(e){
    body2_click = e.currentTarget.id
    qa('.eeee').forEach(item=>{
        item.classList.remove('active')
    })
    e.currentTarget.classList.add('active')
    mobile()
}
mobile()
gsap.from('.body2-card-swiper',{
    xPercent:100,
    scrollTrigger:{
        trigger:"#body2",
        start:'45% center',
        end:'center center',
        scrub:1,
        // markers:true,
    }
})

// body3

var body3_swiper =new Swiper('.body3-swiper',{
    slidesPerView:4,
    spaceBetween:20,
    breakpoints:{
        1:{
            slidesPerView:1.2,
            centeredSlides:true,
        },
        1080:{
            slidesPerView:4,
            centeredSlides:false,
        }
    }
})
var body3_swiper_2 =new Swiper('.body3-swiper-2',{
    slidesPerView:4,
    spaceBetween:20,
    breakpoints:{
        1:{
            slidesPerView:1.2,
            centeredSlides:true,
        },
        1080:{
            slidesPerView:4,
            centeredSlides:false,
        }
    }
})
gsap.from('.body3-swiper',{
    xPercent:-120,
    scrollTrigger:{
        trigger:'#body3',
        start:'top center',
        end:'center center',
        scrub:true,
        // markers:true,
    }
})
gsap.from('.body3-swiper-2',{
    xPercent:120,
    scrollTrigger:{
        trigger:'#body3',
        start:'top center',
        end:'center center',
        scrub:true,
        // markers:true,
    }
})




// body4

Chart.defaults.font.size = 18
Chart.defaults.color = "#79BA78"
var body4_chart = new Chart(q('#body4-chart'),{
    type:"pie",
    data:{
        labels:['Jasper','Midjourney','DALL.E','Stability ai','Deep Dream'],
        datasets:[{
            label:'購買數(萬)',
            data:[150,210,160,170,300],
            backgroundColor:[
                '#79BA78',
                '#E9B824',
                '#FF8080',
                '#6694E9',
                '#1e64ae',
            ]
        }]
    }
})


// body5

var body5_swiper = new Swiper('.body5-swiper',{
    slidesPerView:1.2,
    centeredSlides:true,
    autoplay:{
        delay:5000,
        disableOnInteraction:false,
    },
    pagination:{
        el:'.body5-pagination',
        clickable:true,
    },
    navigation:{
        nextEl:'.body5-swiper-next',
        prevEl:'.body5-swiper-prev',
    }
})

var mess_data = []

function mess_submit(){
    if(q('.body5-right input').value != ''){
        alert('感謝您的留言~已為您送到後端')
        mess_data.push({
            name:q('.mess-name').value,
            email:q('.mess-email').value,
            text:q('.mess-text').value,
        })
        localStorage.setItem('mess-data',JSON.stringify(mess_data))
        body5_swiper.appendSlide(`
        <div class="swiper-slide">
            <div class="forum">
                <div class="div">
                    <h1 class="f5 fw forum-name">${q('.mess-name').value}</h1>
                    <p class="f6 text-end">${q('.mess-email').value}</p>
                </div>
                <div class="forum-content w-100 p-3">
                    <p class="f7 lep lh">${q('.mess-text').value}</p>
                </div>
            </div>
        </div>
        `)
        q('.mess-name').value = ''
        q('.mess-email').value = ''
        q('.mess-text').value = ''
        body5_swiper.slideTo(body5_swiper.slides.length -1 ,0)
        body5_swiper.autoplay.start()
    }
}
window.addEventListener('load',()=>{
    const loca_mess = JSON.parse(localStorage.getItem('mess-data')) || []
    loca_mess.forEach((item,index)=>{
        body5_swiper.appendSlide(`
            <div class="swiper-slide">
                <div class="forum">
                    <div class="div">
                        <h1 class="f5 fw forum-name">${item.name}</h1>
                        <p class="f6 text-end">${item.email}</p>
                    </div>
                    <div class="forum-content w-100 p-3">
                        <p class="f7 lep lh">${item.text}</p>
                    </div>
                </div>
            </div>
            `)
    })
    mess_data = mess_data.concat(loca_mess)
})



// 
const login_modal = new bootstrap.Modal('#login')
const logout_modal = new bootstrap.Modal('#logout')
var log = 0

q('.nav-login').addEventListener('click',()=>{
    if(log === 0){
        login_modal.show()
        qa('#login input').forEach(e => {
            e.value = ''
        });
    }else{
        logout_modal.show()
    }
})
function login(){
    q('.nav-login').innerHTML += `<span class="color2 fw">B034</span>`
    log = 1
}
function logout(){
    q('.nav-login').innerHTML = '<img src="./images/nav-login.png" alt="" class="nav-icon">'
    log = 0
    q('.nav-login').click()
}



var s ='sun'
const color_data = {
    'sun':{
        '--bg--color':'#79BA78',
        '--bg--color2':'#E9B824',
        '--body--bg':'#fff',
        '--body--color':'#000',
    },
    'moon':{
        '--bg--color':'#E9B824',
        '--bg--color2':'#79BA78',
        '--body--bg':'#5d5d5d',
        '--body--color':'#fff',
    },
}
function sun(){
    if(s === 'sun'){
        s = 'moon'
        q('.nav-sun').src = './images/nav-moon.png'
    }else{
        s = 'sun'
        q('.nav-sun').src = './images/nav-sun.png'
    }
    for(let key in color_data[s]){
        document.documentElement.style.setProperty(key,color_data[s][key])
    }
}

// 
var rrr = 0
function robot_click(){
    q('.robot-box').classList.toggle('active')
    q('.robot-btn img').src = ['./images/x.png','./images/robot.png'][rrr++%2]
    gsap.from('.robot-btn img',{
        autoAlpha:0,
        duration:.3,
        ease:'linear'
    })
}
function robot_submit(){
    if(q('.robot-input').value != ''){
        q('.robot-body').innerHTML += `
        <p class="df fdc jcc align-items-end">
            <span class="f7 fw">您</span>
            <span class="f8 mess2">${q('.robot-input').value}</span>
        </p>
        `
        setTimeout(() => {
            q('.robot-body').innerHTML += `
            <p">
                <span class="f7 fw">小愛</span>
                <span class="f8 mess">感謝您的問答，小愛將幫您轉達網頁管理員為您服務</span>
            </p>
            `
            q('.robot-body').scrollTo({
                top:q('.robot-body').scrollHeight,
                behavior:'smooth'
            })
        }, 1000);
        q('.robot-input').value = ''
    }
}
q('.robot-input').addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        robot_submit()
    }
})

var f = 1
const fs_data = {
    '--fs--title':80,
    '--fs--1':70,    
    '--fs--2':60,
    '--fs--3':50,
    '--fs--4':40,
    '--fs--5':30,
    '--fs--6':23,
    '--fs--7':20,
    '--fs--8':17,
}

function fs(){
    f = f %3 +1
    for(let key in fs_data){
        document.documentElement.style.setProperty(key , fs_data[key] + 3* (f-1) + 'px')
    }
    q('.fs-btn').innerText = 'A' + '+'.repeat(f-1)
}

function ddd(t){
    gsap.from(t,{
        x:50,
        autoAlpha:0,
        ease:'linear',
        scrollTrigger:{
            trigger:t,
            start:'top center',
            end:'end center',
            // markers:true,
        }
    })
}
function ddd2(t){
    gsap.from(t,{
        x:-50,
        autoAlpha:0,
        ease:'linear',
        scrollTrigger:{
            trigger:t,
            start:'top center',
            end:'end center',
            // markers:true,
        }
    })
}
ddd(q('.title'))
ddd2(q('.title2'))
ddd(q('.title3'))
ddd2(q('.title4'))
ddd(q('.title5'))