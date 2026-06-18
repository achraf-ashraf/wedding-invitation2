'use client'

import { useEffect, useState, useRef } from 'react'

// Event dates
const WEDDING_DATE = new Date('2026-07-24T00:00:00')

// Contact info
const ASHRAF_PHONE = '+97431481698'
const KHALED_PHONE = '+21626464509'

// Location URLs
const DINNER_LOCATION_URL = 'https://share.google/hj0gP399kWXXEARnQ'
const WEDDING_LOCATION_URL = 'https://share.google/uBW9ywwqdeeNB4MWA'

// Hussein Al Jassmi - Edkhally Omry (ادخلي عمري)
const WEDDING_SONG_URL = 'https://serv100.albumaty.com/songs_2020/Albumaty.Com_hsyn_algsmy_edkhly_amry.mp3'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Helper function to calculate time difference
function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - Date.now()
  
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 }
}

function useCountdown(targetDate: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }
    
    const initialUpdate = requestAnimationFrame(updateCountdown)
    const timer = setInterval(updateCountdown, 1000)

    return () => {
      cancelAnimationFrame(initialUpdate)
      clearInterval(timer)
    }
  }, [targetDate])

  return timeLeft
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center mx-1 sm:mx-3">
      <div className="relative">
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-100 via-white to-amber-50 rounded-xl shadow-lg flex items-center justify-center border border-amber-300/60">
          <span className="text-xl sm:text-3xl font-bold text-amber-900 font-tajawal">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs sm:text-sm text-amber-800 font-tajawal font-semibold">{label}</span>
    </div>
  )
}

function CountdownSection({ targetDate, title }: { targetDate: Date; title: string }) {
  const timeLeft = useCountdown(targetDate)
  
  return (
    <div className="text-center mb-8">
      <h3 className="text-lg sm:text-xl text-amber-900 font-tajawal font-bold mb-6">{title}</h3>
      <div className="flex justify-center flex-wrap">
        <CountdownBox value={timeLeft.days} label="يوم" />
        <CountdownBox value={timeLeft.hours} label="ساعة" />
        <CountdownBox value={timeLeft.minutes} label="دقيقة" />
        <CountdownBox value={timeLeft.seconds} label="ثانية" />
      </div>
    </div>
  )
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center my-5 sm:my-6">
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-600/40 to-amber-700/50" />
      <div className="mx-3 sm:mx-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <div className="w-1.5 h-1.5 bg-amber-600 rotate-45" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-amber-700/50" />
    </div>
  )
}

function EventCard({ 
  title, 
  date, 
  venue, 
  time, 
  extraInfo,
  locationUrl,
  icon
}: { 
  title: string
  date: string
  venue: string
  time: string
  extraInfo?: string
  locationUrl: string
  icon: React.ReactNode
}) {
  return (
    <div className="relative group">
      {/* Gold border glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 via-amber-400/20 to-amber-500/30 rounded-3xl blur-sm opacity-60" />
      
      <div className="relative bg-gradient-to-br from-amber-50/95 via-white/90 to-amber-50/95 backdrop-blur-sm rounded-3xl p-5 sm:p-7 shadow-xl border border-amber-300/40">
        
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 text-white shadow-lg mb-3">
            {icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-ruqaa text-amber-900 font-bold">{title}</h3>
        </div>
        
        {/* Details */}
        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-transparent via-amber-100/80 to-transparent rounded-xl py-3">
            <svg className="w-5 h-5 text-amber-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm sm:text-base font-tajawal text-amber-900 font-semibold">{date}</span>
          </div>
          
          {/* Time */}
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-transparent via-amber-100/80 to-transparent rounded-xl py-3">
            <svg className="w-5 h-5 text-amber-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm sm:text-base font-tajawal text-amber-900 font-semibold">{time}</span>
          </div>
          
          {/* Extra Info */}
          {extraInfo && (
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-transparent via-rose-100/80 to-transparent rounded-xl py-3">
              <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
              </svg>
              <span className="text-sm sm:text-base font-tajawal text-rose-700 font-semibold">{extraInfo}</span>
            </div>
          )}
          
          {/* Venue - Clickable */}
          <a 
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-green-50 via-green-100/70 to-green-50 rounded-xl p-4 border-2 border-green-400/60 hover:border-green-500 hover:shadow-lg hover:shadow-green-200/50 transition-all cursor-pointer group/link">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base font-tajawal text-green-800 font-bold">{venue}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md group-hover/link:from-green-600 group-hover/link:to-green-700 transition-all">
                <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm font-tajawal text-white font-bold">اضغط هنا لفتح الموقع</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

function ContactCard({ name, phone, role }: { name: string; phone: string; role: string }) {
  const whatsappUrl = `https://wa.me/${phone.replace('+', '')}`
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 to-green-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex flex-col gap-2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border-2 border-green-300/60 hover:border-green-500 hover:shadow-lg hover:shadow-green-200/50 transition-all">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs text-green-600 font-tajawal font-medium">{role}</p>
            <p className="text-base font-bold text-gray-800 font-tajawal">{name}</p>
            <p className="text-sm text-green-700 font-tajawal font-semibold" dir="ltr">{phone}</p>
          </div>
        </div>
        {/* Click to contact button */}
        <div className="flex items-center justify-center gap-2 mt-2 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md group-hover:from-green-600 group-hover:to-green-700 transition-all">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-tajawal text-white font-bold">اضغط للتواصل عبر واتساب</span>
        </div>
      </div>
    </a>
  )
}

// Background Music - Auto Play
function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio(WEDDING_SONG_URL)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      const handleUserInteraction = () => {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {})
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }
      document.addEventListener('click', handleUserInteraction)
      document.addEventListener('touchstart', handleUserInteraction)
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <button
      onClick={toggleMusic}
      className={`fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full shadow-lg transition-all duration-300 ${
        isPlaying 
          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' 
          : 'bg-white/95 text-amber-700 border border-amber-300'
      }`}
      aria-label={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5">
            <span className="w-0.5 h-3 bg-white rounded-full animate-music-bar" style={{ animationDelay: '0s' }} />
            <span className="w-0.5 h-4 bg-white rounded-full animate-music-bar" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.5 h-2 bg-white rounded-full animate-music-bar" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-xs font-tajawal font-medium">إيقاف</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span className="text-xs font-tajawal font-medium">تشغيل</span>
        </>
      )}
    </button>
  )
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden pb-6">
      {/* Luxurious Parchment Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100/80" />
      
      {/* Vintage paper texture overlay */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />
      
      {/* Ornate corner decorations - Top Right */}
      <div className="fixed top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8860b" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#daa520" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <path fill="url(#goldGrad1)" d="M200,0 L200,60 Q150,60 150,100 Q150,140 100,150 Q60,150 60,200 L0,200 L0,0 Z"/>
          <path fill="none" stroke="#b8860b" strokeWidth="1" strokeOpacity="0.3" d="M200,20 Q160,20 160,60 Q160,100 120,110 Q80,120 80,160 Q80,200 40,200"/>
          <path fill="none" stroke="#daa520" strokeWidth="0.5" strokeOpacity="0.4" d="M200,40 Q140,40 140,80 Q140,120 100,130 Q60,140 60,180"/>
        </svg>
      </div>
      
      {/* Ornate corner decorations - Bottom Left */}
      <div className="fixed bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="goldGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#b8860b" stopOpacity="0.4"/>
              <stop offset="50%" stopColor="#daa520" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#b8860b" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <path fill="url(#goldGrad2)" d="M0,200 L0,140 Q50,140 50,100 Q50,60 100,50 Q140,50 140,0 L200,0 L200,200 Z"/>
          <path fill="none" stroke="#b8860b" strokeWidth="1" strokeOpacity="0.3" d="M0,180 Q40,180 40,140 Q40,100 80,90 Q120,80 120,40 Q120,0 160,0"/>
          <path fill="none" stroke="#daa520" strokeWidth="0.5" strokeOpacity="0.4" d="M0,160 Q60,160 60,120 Q60,80 100,70 Q140,60 140,20"/>
        </svg>
      </div>
      
      {/* Decorative floral elements */}
      <div className="fixed top-20 left-10 w-24 h-24 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700">
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <ellipse cx="50" cy="30" rx="6" ry="15" fill="currentColor" opacity="0.7"/>
          <ellipse cx="50" cy="70" rx="6" ry="15" fill="currentColor" opacity="0.7"/>
          <ellipse cx="30" cy="50" rx="15" ry="6" fill="currentColor" opacity="0.7"/>
          <ellipse cx="70" cy="50" rx="15" ry="6" fill="currentColor" opacity="0.7"/>
        </svg>
      </div>
      
      <div className="fixed bottom-20 right-10 w-24 h-24 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700">
          <circle cx="50" cy="50" r="8" fill="currentColor"/>
          <ellipse cx="50" cy="30" rx="6" ry="15" fill="currentColor" opacity="0.7"/>
          <ellipse cx="50" cy="70" rx="6" ry="15" fill="currentColor" opacity="0.7"/>
          <ellipse cx="30" cy="50" rx="15" ry="6" fill="currentColor" opacity="0.7"/>
          <ellipse cx="70" cy="50" rx="15" ry="6" fill="currentColor" opacity="0.7"/>
        </svg>
      </div>
      
      {/* Background Music */}
      <BackgroundMusic />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Main Invitation Card */}
          <div className="relative mb-8">
            {/* Gold outer border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 via-amber-400/30 to-amber-500/40 rounded-[1.8rem]" />
            <div className="absolute -inset-2 border-2 border-amber-300/30 rounded-[2rem]" />
            
            <div className="relative bg-gradient-to-br from-stone-50/98 via-amber-50/95 to-stone-50/98 backdrop-blur-sm rounded-3xl p-5 sm:p-8 shadow-2xl border border-amber-200/60">
              
              {/* Inner decorative border */}
              <div className="absolute inset-3 border border-amber-300/40 rounded-2xl pointer-events-none" />
              
              {/* Ornate top decoration */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-xl ring-4 ring-stone-50">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  {/* Decorative leaves around heart */}
                  <svg className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-600/60" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                  </svg>
                  <svg className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-amber-600/60 scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
                  </svg>
                </div>
              </div>
              
              {/* Content */}
              <div className="pt-8">
                {/* Bismillah */}
                <div className="mb-5">
                  <p className="text-xl sm:text-2xl font-ruqaa text-amber-800">
                    بسم الله الرحمن الرحيم
                  </p>
                </div>
                
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-ruqaa text-amber-900 font-bold mb-4">
                  دعوة زفاف
                </h1>
                
                <OrnamentalDivider />
                
                {/* Quranic Verse - FIRST */}
                <div className="bg-gradient-to-r from-transparent via-amber-100/60 to-transparent rounded-xl py-4 px-4 mb-5 border-y border-amber-200/50">
                  <p className="text-base sm:text-lg font-ruqaa text-amber-800 leading-relaxed">
                    ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾
                  </p>
                </div>
                
                {/* Invitation Text */}
                <div className="space-y-4 mb-5">
                  <p className="text-lg sm:text-xl font-tajawal text-amber-800">
                    تتشرف عائلة
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-ruqaa text-amber-900 font-bold">
                    خالد بن روينة
                  </h2>
                  <p className="text-base sm:text-lg font-tajawal text-amber-700">
                    بدعوتكم أنتم وعائلتكم الكريمة لحضور زفاف ابنهم
                  </p>
                </div>
                
                <OrnamentalDivider />
                
                {/* Couple Names */}
                <div className="py-5">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="text-center">
                      <div className="inline-block px-5 py-2 bg-gradient-to-r from-amber-100/80 to-amber-50/80 rounded-full border border-amber-300/50">
                        <h3 className="text-xl sm:text-2xl font-ruqaa text-amber-900 font-bold">
                          أشرف بن روينة
                        </h3>
                      </div>
                    </div>
                    
                    <div className="text-center py-1">
                      <p className="text-base sm:text-lg font-ruqaa text-amber-700">
                        على الانسة الكريمة
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="inline-block px-5 py-2 bg-gradient-to-r from-rose-50/80 to-rose-100/80 rounded-full border border-rose-200/50">
                        <h3 className="text-xl sm:text-2xl font-ruqaa text-amber-900 font-bold">
                          آمنة التريكي
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Countdown Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-ruqaa text-amber-900 font-bold mb-5">
              العد التنازلي للعرس
            </h2>
            <CountdownSection targetDate={WEDDING_DATE} title="باقٍ على موعد الزفاف" />
          </div>
          
          {/* Events Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-ruqaa text-amber-900 font-bold mb-6">
              تفاصيل المناسبات
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {/* Dinner Event */}
              <EventCard
                title="حفل العشاء"
                date="22 يوليو 2026"
                venue="فضاء لخديجة للأفراح"
                time="من السابعة مساءً حتى العاشرة ليلاً"
                extraInfo="حفلة غنائية بعد العشاء"
                locationUrl={DINNER_LOCATION_URL}
                icon={
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                }
              />
              
              {/* Wedding Event */}
              <EventCard
                title="يوم الزفاف"
                date="24 يوليو 2026"
                venue="Le Palace Miami Salle des Fêtes"
                time="من التاسعة مساءً حتى الواحدة صباحاً"
                locationUrl={WEDDING_LOCATION_URL}
                icon={
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                }
              />
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-ruqaa text-amber-900 font-bold mb-3">
              للتواصل والتأكيد
            </h2>
            <p className="text-sm sm:text-base font-tajawal text-amber-700 mb-5">
              يرجى التواصل معنا عبر واتساب للحضور والتأكيد
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              <ContactCard 
                name="أشرف بن روينة" 
                phone={ASHRAF_PHONE}
                role="العريس"
              />
              <ContactCard 
                name="خالد بن روينة" 
                phone={KHALED_PHONE}
                role="والد العريس"
              />
            </div>
          </div>
          
          {/* Footer Message */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400/30 via-amber-300/20 to-amber-400/30 rounded-xl blur-sm" />
            <div className="relative bg-gradient-to-br from-stone-50/95 to-amber-50/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-amber-200/50">
              <p className="text-lg sm:text-xl font-tajawal text-amber-800 leading-relaxed mb-2">
                نتشرف بتشريفكم ومشاركتكم أفراحنا
              </p>
              <p className="text-base font-ruqaa text-amber-700">
                سعداء بوجودكم بيننا
              </p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-6 text-center">
            <p className="text-xs font-tajawal text-amber-500">
              دعوة زفاف أشرف و آمنة © 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
