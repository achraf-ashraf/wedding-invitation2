"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Calendar, Heart, Music, Share2 } from "lucide-react";
// تأكد من وجود الصور في مجلد assets أو استبدل الروابط بروابطك الخاصة
import coupleImg from "../assets/couple.jpg"; 
import bgImg from "../assets/bg.jpg"; 

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- البيانات (تم حذف حفل العشاء هنا) ---
  const events = [
    {
      id: 1,
      title: "حفل الزفاف",
      date: "الجمعة، ٢٠ أكتوبر ٢٠٢٣",
      time: "٨:٠٠ مساءً",
      location: "قاعة الأفق للمناسبات",
      mapLink: "https://maps.google.com",
      description: "نتشرف بدعوتكم لحضور حفل زفافنا ومشاركتنا فرحتنا",
      color: "bg-amber-100",
      textColor: "text-amber-900",
    },
    // (تم حذف حفل العشاء بالكامل)
  ];

  const toggleMusic = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-800 font-sans overflow-x-hidden selection:bg-amber-200">
      {/* خلفية زخرفية */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* شاشة الغلاف */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdfbf7] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-center relative z-10 p-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <div className="w-20 h-20 mx-auto border-2 border-amber-800 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-amber-800 fill-amber-800" />
                </div>
              </motion.div>
              <h1 className="text-4xl font-bold mb-2 text-amber-900">دعوة زفاف</h1>
              <p className="text-amber-700/80">اضغط لفتح الدعوة</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* المحتوى الرئيسي */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 pb-20"
        >
          {/* الهيدر */}
          <header className="pt-20 pb-12 text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-stone-800 mb-4"
            >
              محمد <span className="text-amber-600">&</span> سارة
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-stone-600 max-w-lg mx-auto"
            >
              بسم الله الرحمن الرحيم، نتشرف بدعوتكم لمشاركتنا أفرحنا
            </motion.p>
          </header>

          {/* صورة العروسين */}
          <div className="flex justify-center mb-12 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl"
            >
              {/* إذا لم تكن الصورة موجودة، يمكنك استخدام رابط بديل */}
              <img
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
                alt="Couple"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* عرض الأحداث (بدون العشاء) */}
          <main className="max-w-2xl mx-auto px-6 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-stone-800">موعد الفرح</h2>
              <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`rounded-3xl p-8 shadow-lg border border-white/50 ${event.color} ${event.textColor} relative overflow-hidden group`}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <div className="p-3 bg-white/50 rounded-full backdrop-blur-sm">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <div className="p-3 bg-white/50 rounded-full backdrop-blur-sm">
                        <Clock className="w-6 h-6" />
                      </div>
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <div className="p-3 bg-white/50 rounded-full backdrop-blur-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="text-center md:text-right">
                        <p>{event.location}</p>
                        <a 
                          href={event.mapLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-sm opacity-75 underline hover:opacity-100"
                        >
                          عرض الموقع
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* زخرفة خلفية */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors" />
              </motion.div>
            ))}
          </main>

          {/* الفوتر */}
          <footer className="text-center mt-16 px-6 pb-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block p-6 rounded-full bg-white/50 backdrop-blur-sm shadow-sm"
            >
              <p className="text-2xl mb-2">شكراً لكم</p>
              <p className="text-sm opacity-70">نتمنى أن تشاركونا فرحتنا</p>
            </motion.div>
          </footer>

          {/* أزرار التحكم العائمة */}
          <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
            <button
              onClick={toggleMusic}
              className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
                isPlaying ? "bg-amber-600 text-white" : "bg-white text-amber-600"
              }`}
            >
              <Music className="w-5 h-5" fill={isPlaying ? "white" : "none"} />
            </button>
            
            <button className="w-12 h-12 rounded-full bg-white text-amber-600 shadow-lg flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
