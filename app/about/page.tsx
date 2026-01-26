import { Metadata } from 'next'
import { Code2, Rocket, Heart, Award } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About | Robin te Hofstee',
  description: 'Learn more about Robin te Hofstee, a technology enthusiast passionate about web development.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-titans-red">
          <div className="w-full h-full bg-gradient-to-br from-titans-red to-titans-accent flex items-center justify-center text-white text-5xl font-bold">
            <Image src="/me-compressed1.png" width={250} height={250} alt="profile_picture" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
          About Me
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Technology enthusiast • Web Developer • Lifelong Learner
        </p>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-16">
        <p className="text-xl leading-relaxed">
          Hi! I'm Robin te Hofstee, a technology enthusiast with a deep love for programming and building 
          cool stuff on the web.
        </p>

        <h2>My Journey</h2>
        <p>
          I've recently discovered a passion for tech blogging and writing. I'm enthusiastic about sharing 
          insights and knowledge from the ever-evolving world of technology. My goal is to make complex 
          technical concepts accessible and interesting to everyone.
        </p>

        <h2>What I'm Learning</h2>
        <p>
          Currently, I'm diving deep into <code>React</code> and <code>NextJS</code> to build modern, 
          performant web applications. The JavaScript ecosystem is constantly evolving, and I love staying 
          up-to-date with the latest tools and best practices.
        </p>

        <h2>My Philosophy</h2>
        <blockquote>
          "You become what you believe." - Oprah Winfrey
        </blockquote>
        <p>
          This quote resonates deeply with me. I believe that with dedication, continuous learning, and 
          a growth mindset, we can achieve anything we set our minds to.
        </p>
      </div>

      {/* Skills/Interests Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-titans-red/10 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-titans-red" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Technologies</h3>
          </div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>• React & NextJS</li>
            <li>• JavaScript & TypeScript</li>
            <li>• Node.js & NestJS</li>
            <li>• HTML, CSS & Tailwind</li>
            <li>• Git & Version Control</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-titans-red/10 rounded-lg flex items-center justify-center">
              <Rocket className="w-6 h-6 text-titans-red" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Interests</h3>
          </div>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li>• Web Development</li>
            <li>• UI/UX Design</li>
            <li>• Technical Writing</li>
            <li>• Open Source</li>
            <li>• Continuous Learning</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-titans-red/10 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-titans-red" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Passion</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Building cool websites and applications that solve real problems and make people's lives easier.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-titans-red/10 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-titans-red" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Goal</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            To share knowledge, inspire others, and contribute to the developer community through quality content.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-titans-red to-titans-accent rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Let's Connect!</h2>
        <p className="mb-6 opacity-90 max-w-2xl mx-auto">
          I'm always interested in connecting with fellow developers, tech enthusiasts, or anyone who 
          wants to chat about web development, React, or technology in general.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:robintehofstee@gmail.com"
            className="px-6 py-3 bg-white text-titans-red rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Email Me
          </a>
          <a
            href="https://x.com/Robin_teHofstee"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
          >
            Follow on 𝕏
          </a>
          <a
            href="https://robintehofstee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
