'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Gift, Sparkles, ArrowRight, Mail, Cake, PartyPopper } from 'lucide-react'

interface Question {
  id: number
  question: string
  image: string
  yesText?: string
  noText?: string  
  isLastQuestion?: boolean
}

const questions: Question[] = [
  {
    id: 1,
    question: "gue pengen say something to u nih..",
    image: "/images/nailong.jpg",
    yesText: "spill it",
    noText: "nah, skip aja deh"
  },
  {
    id: 2, 
    question: "nih foto em yg.. ya u know lah 😏",
    image: "/images/nail.jpg",
    yesText: "lmao lanjut",
    noText: "rude sih"
  },
  {
    id: 3,
    question: "fr fr, u sure em mau tau??",
    image: "/images/nailx.jpg",
    yesText: "100% sure",
    noText: "nope lol"
  },
  {
    id: 4,
    question: "last chance nih, beneran mau tau?? 👀",
    image: "/images/hehw.jpg",
    yesText: "ya drop it",
    noText: "eh ntar dulu deh",
    isLastQuestion: true
  }
]


export default function BirthdayWebsite() {
  const [isClient, setIsClient] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [yesButtonPosition, setYesButtonPosition] = useState({ x: 0, y: 0 })
  const [isYesButtonMoving, setIsYesButtonMoving] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't render anything until we're on the client
  if (!isClient) {
    return null
  }

  const handleAnswerSelect = (answer: boolean) => {
    // Kalau pertanyaan terakhir dan jawab "No", tombol No kabur
    if (questions[currentQuestion].isLastQuestion && !answer) {
      console.log("Tombol NO diklik di pertanyaan terakhir!") // Debug
      
      // Increment click count untuk posisi yang berbeda setiap kali
      const newClickCount = noClickCount + 1
      setNoClickCount(newClickCount)
      setIsNoButtonMoving(true)
      
      // Random positions that are more dramatic
      const randomPositions = [
        { x: 200, y: -150 },
        { x: -250, y: 100 },
        { x: 300, y: 180 },
        { x: -200, y: -120 },
        { x: 150, y: 200 },
        { x: -180, y: -180 },
        { x: 250, y: 80 },
        { x: -300, y: -100 },
        { x: 180, y: -200 },
        { x: -220, y: 150 },
        { x: 280, y: -80 },
        { x: -150, y: 220 }
      ]
      
      // Gunakan click count untuk memilih posisi yang berbeda setiap kali
      const selectedPosition = randomPositions[newClickCount % randomPositions.length]
      setNoButtonPosition(selectedPosition)
      
      console.log(`Moving button to position:`, selectedPosition) // Debug
      
      // Reset posisi setelah 1.5 detik
      setTimeout(() => {
        setIsNoButtonMoving(false)
        setNoButtonPosition({ x: 0, y: 0 })
        console.log("Button position reset") // Debug
      }, 1500)
      return // PENTING: jangan lanjut ke pertanyaan berikutnya
    }

    setSelectedAnswer(answer)
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1000)
  }

  const handleOpenLetter = () => {
    setShowQuiz(true)
  }

  // Tampilan awal seperti surat
  if (!showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4 safe-area-inset">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative w-full max-w-sm mx-auto"
        >
          {/* Amplop */}
          <div className="bg-gradient-to-br from-pink-200 to-purple-200 p-6 sm:p-8 rounded-2xl shadow-2xl w-full transform perspective-1000">
            
            {/* Dekorasi amplop */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4">
              <Star className="text-yellow-400 text-2xl sm:text-3xl animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
              <Cake className="text-pink-500 text-2xl sm:text-3xl animate-bounce" />
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4">
              <Heart className="text-red-400 text-xl sm:text-2xl animate-pulse" />
            </div>
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4">
              <Gift className="text-purple-500 text-xl sm:text-2xl animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Isi surat */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-inner">
              <div className="text-center mb-4 sm:mb-6">
                <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-pink-500 mx-auto mb-3 sm:mb-4" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
                  Special Letter ✨
                </h1>
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full"></div>
              </div>

              <div className="text-center mb-4 sm:mb-6">
                <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed">
                  please ayo dong dibuka..
                </p>
                <div className="flex justify-center items-center gap-2 mb-3 sm:mb-4">
                  <Cake className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                  <span className="text-gray-600 font-medium text-sm sm:text-base">—keonaa</span>
                  <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenLetter}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Heart className="text-lg sm:text-xl" />
                  <span className="text-base sm:text-lg">OPEN</span>
                  <Heart className="text-lg sm:text-xl" />
                </div>
              </motion.button>
            </div>

            {/* Floating hearts - responsive positioning */}
            <motion.div
              animate={{ y: [-10, -20, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-6 left-6 sm:top-8 sm:left-8 text-pink-300 opacity-60 text-lg sm:text-xl"
            >
              ❤️
            </motion.div>
            <motion.div
              animate={{ y: [-15, -25, -15] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-8 right-8 sm:top-12 sm:right-12 text-purple-300 opacity-60 text-lg sm:text-xl"
            >
              💜
            </motion.div>
            <motion.div
              animate={{ y: [-8, -18, -8] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
              className="absolute bottom-12 left-8 sm:bottom-16 sm:left-12 text-yellow-300 opacity-60 text-lg sm:text-xl"
            >
              ⭐
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4 safe-area-inset"
      >
        <div className="max-w-2xl mx-auto text-center w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mb-6 sm:mb-8"
          >
            <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-pink-500 mx-auto mb-4 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4 px-2">
              Happy Birthday EM! 🎉
            </h1>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-6 sm:mb-8"
          >
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
              Ini adalah foto spesial untukmu ❤️
            </p>
          </motion.div>

          {/* Foto Gallery */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, type: "spring" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 px-2"
          >
            {/* Foto 1 */}
            <motion.div
              initial={{ x: -50, rotate: -5 }}
              animate={{ x: 0, rotate: 2 }}
              transition={{ delay: 1.7, type: "spring" }}
              className="relative mx-auto max-w-sm md:max-w-none"
            >
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-300">
                <img 
                  src="/images/foto1.png" 
                  alt="Foto Spesial 1" 
                  className="w-full h-60 sm:h-80 object-cover rounded-lg"
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 animate-spin" />
              </div>
            </motion.div>

            {/* Foto 2 */}
            <motion.div
              initial={{ x: 50, rotate: 5 }}
              animate={{ x: 0, rotate: -2 }}
              transition={{ delay: 1.9, type: "spring" }}
              className="relative mx-auto max-w-sm md:max-w-none"
            >
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-300">
                <img 
                  src="/images/foto2.png" 
                  alt="Foto Spesial 2" 
                  className="w-full h-60 sm:h-80 object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>

          {/* Ucapan Romantis */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="text-center space-y-4 sm:space-y-6 px-2"
          >
            {/* Letter Container with improved design */}
            <div className="relative bg-gradient-to-br from-white/95 to-pink-50/95 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 mx-auto max-w-4xl border-2 border-pink-200 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3">
                <Star className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 animate-bounce" />
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 animate-pulse" />
              </div>

              {/* Letter Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold mb-4">
                  <Mail className="w-4 h-4" />
                  <span>Special Birthday Letter</span>
                  <Mail className="w-4 h-4" />
                </div>
              </div>

              {/* Letter Content with better formatting */}
              <div className="text-left space-y-4 sm:space-y-5">
                <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                  &quot;
                </div>
                
                <div className="space-y-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  <p className="font-medium text-pink-700">Hai em,</p>
                  <p>🎂 <span className="font-semibold">Selamat ulang tahun</span></p>
                  
                  <p className="pl-4 border-l-4 border-pink-300 bg-pink-50/50 p-3 rounded-r-lg">
                    Semoga di usia baru ini, kamu semakin dikelilingi hal-hal baik—kesempatan besar, 
                    orang-orang tulus, dan kebahagiaan yang nggak dibuat-buat. Kamu pantas mendapatkan 
                    itu semua, dan lebih.
                  </p>
                  
                  <p className="pl-4 border-l-4 border-purple-300 bg-purple-50/50 p-3 rounded-r-lg italic">
                    On your special day, I wish you moments that feel just right, goals that come closer, 
                    and smiles that come from the heart.
                  </p>
                  
                  <p className="text-center font-medium text-red-600 bg-red-50/50 p-3 rounded-lg">
                    💕 Also… I love your eyes—honestly, they have this way of making people (well, me) 
                    lose their train of thought. 💕
                  </p>
                  
                  <p className="pl-4 border-l-4 border-pink-300 bg-pink-50/50 p-3 rounded-r-lg">
                    em punya cara sendiri untuk bikin hari orang lain lebih hangat, termasuk hari aku. 
                    Jadi, semoga hari ini giliran kamu yang merasa spesial.
                  </p>
                  
                  <p className="pl-4 border-l-4 border-purple-300 bg-purple-50/50 p-3 rounded-r-lg italic">
                    Always take care, stay safe, stay happy, stay healthy, happy birthday. Again, 
                    enjoy your day, birthday person. And don't be surprised if more people start 
                    falling for that charm of yours... one look at those eyes, and it's kind of inevitable.
                  </p>
                </div>
                
                <div className="text-right mt-6">
                  <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium">
                    —keonaa 💝
                  </div>
                </div>
                
                <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-right">
                  &quot;
                </div>
              </div>
            </div>

            {/* Enhanced Birthday Wishes */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-4 sm:p-6 mx-auto max-w-2xl shadow-xl"
            >
              <div className="flex justify-center items-center gap-3 sm:gap-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                <span className="text-lg sm:text-xl md:text-2xl font-bold">Happy Birthday, Bestie!</span>
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
              </div>
              <div className="flex justify-center mt-3 gap-2">
                <Cake className="w-5 h-5 text-yellow-300 animate-bounce" />
                <PartyPopper className="w-5 h-5 text-yellow-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <Gift className="w-5 h-5 text-yellow-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center p-4 safe-area-inset">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mb-6 sm:mb-8 overflow-hidden"
        >
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border-t-4 border-pink-500 mx-auto max-w-2xl"
          >
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center items-center gap-2 mb-4 sm:mb-6">
                <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                <span className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-wide">
                  Pertanyaan {currentQuestion + 1} dari {questions.length}
                </span>
              </div>
              
              {/* Foto/GIF di atas pertanyaan */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg mx-auto max-w-xs sm:max-w-sm">
                  <img 
                    src={questions[currentQuestion].image}
                    alt={`Foto untuk pertanyaan ${currentQuestion + 1}`}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg"
                  />
                </div>
              </motion.div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 px-2">
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Yes/No Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 relative px-2">
              {/* Tombol YES - normal, selalu bisa diklik */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerSelect(true)}
                className={`w-auto sm:w-auto px-3 sm:px-8 py-2 sm:py-6 rounded-lg sm:rounded-xl border-2 text-xs sm:text-lg font-bold transition-all duration-300 min-w-[80px] sm:min-w-[160px] touch-manipulation ${
                  selectedAnswer === true
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-green-300 bg-green-100 hover:border-green-500 hover:bg-green-200 text-green-700'
                }`}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <Heart className="w-2 h-2 sm:w-5 sm:h-5" />
                  <span className="truncate">{questions[currentQuestion].yesText || "YES"}</span>
                </div>
              </motion.button>

              {/* Tombol NO - kabur di pertanyaan terakhir */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerSelect(false)}
                className={`w-auto sm:w-auto px-3 sm:px-8 py-2 sm:py-6 rounded-lg sm:rounded-xl border-2 text-xs sm:text-lg font-bold transition-all duration-300 min-w-[80px] sm:min-w-[160px] touch-manipulation ${
                  selectedAnswer === false && !questions[currentQuestion].isLastQuestion
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-red-300 bg-red-100 hover:border-red-500 hover:bg-red-200 text-red-700'
                }`}
                disabled={selectedAnswer !== null && !questions[currentQuestion].isLastQuestion}
                style={{
                  transform: questions[currentQuestion].isLastQuestion && isNoButtonMoving 
                    ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` // Full movement
                    : 'translate(0, 0)',
                  transition: questions[currentQuestion].isLastQuestion && isNoButtonMoving 
                    ? 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' // More dramatic easing
                    : 'transform 0.3s ease-in-out',
                  zIndex: questions[currentQuestion].isLastQuestion && isNoButtonMoving ? 10 : 'auto'
                }}
              >
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <span className="truncate">{questions[currentQuestion].noText || "NO"}</span>
                </div>
              </motion.button>
            </div>

            {/* Pesan untuk pertanyaan terakhir - DIHAPUS */}
          </motion.div>
        </AnimatePresence>

        {/* Decorative Elements - Hidden on small screens */}
        <div className="hidden sm:block fixed top-10 left-10 opacity-20">
          <Star className="w-6 h-6 md:w-8 md:h-8 text-pink-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div className="hidden sm:block fixed top-20 right-20 opacity-20">
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-purple-400 animate-bounce" />
        </div>
        <div className="hidden sm:block fixed bottom-10 left-20 opacity-20">
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" />
        </div>
        <div className="hidden sm:block fixed bottom-20 right-10 opacity-20">
          <Gift className="w-6 h-6 md:w-7 md:h-7 text-pink-400 animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  )
}
