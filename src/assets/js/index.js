import 'swiper/css';
import '../styles/reset.scss'
import '../styles/styles.scss'
import Swiper from 'swiper/bundle';

const classes = {
	opened: 'opened',
	hidden: 'hidden',
	active: 'active',
}

const values = [
	{
		price: 19.99,
		title: "Standard Edition",
	},
	{
		price: 18.99,
		title: "Standard Edition",
	},
	{
		price: 29.99,
		title: "Deluxe Edition",
	},
]

// header menu

const menuButton = document.querySelector('.header-menu__button')
const header = document.querySelector('.header')

const toggleMenu = () => header.classList.toggle(classes.opened)

menuButton.addEventListener('click', toggleMenu)

// scroll по секциям

const menuLink = document.querySelectorAll('.menu-link')

const scrollToSection = e => {
	e.preventDefault()

	const href = e.currentTarget.getAttribute('href')

	if (!href && !href.startsWith('#')) return

	const section = href.slice(1)

	const top = document.getElementById(section)?.offsetTop || 0

	window.scrollTo({ top, behavior: 'smooth' })
}

menuLink.forEach(link => link.addEventListener('click', scrollToSection))

// таймер

const formatValue = value => (value < 10 ? `0${value}` : value)

const getTimerValues = diff => ({
	seconds: (diff / 1000) % 60,
	minutes: (diff / (1000 * 60)) % 60,
	hours: (diff / (1000 * 3600)) % 24,
	days: Math.floor(diff / (1000 * 3600 * 24)),
})

const setTimerValues = values => {
	Object.entries(values).forEach(([key, value]) => {
		const timerValue = document.getElementById(key)
		timerValue.innerText = formatValue(Math.floor(value))
	})
}

const startTimer = date => {
	const id = setInterval(() => {
		const diff = new Date(date).getTime() - new Date().getTime()

		if (diff < 0) {
			clearInterval(id)
			return
		}

		setTimerValues(getTimerValues(diff))
	}, 1000)
}

startTimer('January 1, 2024 00:00:00')

// добавляем видео

let isPlay = false

const video = document.getElementById('video')
const videoButton = document.querySelector('.video-btn')

const handleVideo = ({ target }) => {
	const info = target.parentElement

	isPlay = !isPlay

	info.classList.toggle(classes.hidden, isPlay)

	target.innerText = isPlay ? 'Pause' : 'Play'

	isPlay ? video.play() : video.pause()
}

videoButton.addEventListener('click', handleVideo)

// chekbox

const checkboxes = {
	requirements: ['minimum', 'recommended'],
	versions: ['standard', 'limited'],
}

const checkbox = document.querySelectorAll('.checkbox')

const handleCheckbox = ({ currentTarget: { checked, name } }) => {
	const { active } = classes
	const value = checkboxes[name][Number(checked)]
	const list = document.getElementById(value)
	const tabs = document.querySelectorAll(`[data-${name}]`)
	const siblings = list.parentElement.children

	for (const item of siblings) item.classList.remove(active)
	for (const tab of tabs) {
		tab.classList.remove(active)
		tab.dataset[name] === value && tab.classList.add(active)
	}

	list.classList.add(active)
}

checkbox.forEach(box => box.addEventListener('click', handleCheckbox))

// slider

const initSlider = () => {
	new Swiper('.swiper', {
		loop: true,
		slidesPerView: 2,
		spaceBetween: 20,
		initialSlide: 2,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
}

initSlider()


// accardion

const faqItem = document.querySelectorAll('.faq-item')

const handleFaqItem = ({ currentTarget: target }) => {
	target.classList.toggle(classes.opened)
	const isOpened = target.classList.contains(classes.opened)
	const height = target.querySelector('p').clientHeight
	const content = target.querySelector('.faq-item__content')

	content.style.height = `${isOpened ? height : 0}px`
}

faqItem.forEach(item => item.addEventListener('click', handleFaqItem))


// scroll анимации 

const sections = document.querySelectorAll('.section');

const handleScroll = () => {

	const { scrollY: y, innerHeight: h } = window;

	sections.forEach((section) => {
		if (y > section.offsetTop - h / 1.5) section.classList.remove(classes.hidden)
	})

}


window.addEventListener('scroll', handleScroll);



// modal


const buyButton = document.querySelectorAll('.buy-button')
const modal = document.querySelector('.modal')
const modalTitle = document.querySelector('.modal-version ')
const modalPrice = document.querySelector('.modal-total__price')
const modalClose = document.querySelector('.modal-close')
const overlay = document.querySelector('.overlay')

const handleBuyButton = ({ currentTarget: target }) => {
	const { value } = target.dataset

	if (!value) return

	const { price, title } = values[value]

	modalTitle.innerText = title
	modalPrice.innerText = `${price}$`
	modal.classList.add(classes.opened)
	overlay.classList.add(classes.opened)
}


const closeModal = () => {
	modal.classList.remove(classes.opened)
	overlay.classList.remove(classes.opened)
}



modalClose.addEventListener('click', closeModal)

buyButton.forEach((btn) => btn.addEventListener('click', handleBuyButton))
