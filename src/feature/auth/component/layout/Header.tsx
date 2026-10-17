import { Book, Brain, FolderCode, Text } from 'lucide-react'


export default function Header() {
  return (
        <section className='bg-blue-100 flex flex-col justify-center relative
        before:content-[""] before:absolute before:size-50 before:rounded-full before:bg-[#50A2FF] before:blur-3xl before:top-[5rem] before:right-[-1rem] overflow-hidden
        after:content-[""] after:absolute after:size-50 after:rounded-full after:bg-[#50A2FF] after:blur-3xl after:bottom-[-5rem] after:left-[-1rem] overflow-hidden
        '>
          <div className='md:w-[600px] mx-auto'>
            <div className='text-[#155DFC] flex justify-start gap-2 mb-25'>
              <FolderCode />
              <p className='font-bold'>Exam App</p>
            </div>
            <p className='text-[#1F2937] font-bold  text-[30px]'>Empower your learning journey with our smart exam platform.</p>

            <div className='text-[#155DFC] flex justify-start gap-5 my-8'>
              <Brain className='border border-[#155DFC] size-[40px] border-[2px] p-0.5'/>
              <div>
                <p className='font-semibold text-xl'>Tailored Diplomas</p>
                <p className='font-semibold text-[#525457] leading'>Choose from specialized tracks like Frontend, Backend, and Mobile Development.</p>
              </div>
            </div>

            <div className='text-[#155DFC] flex justify-start gap-5 my-8'>
              <Book className='border border-[#155DFC] size-[40px] border-[2px] p-0.5'/>
              <div>
                <p className='font-semibold text-xl'>Focused Exams</p>
                <p className='font-semibold text-[#525457] leading'>Access topic-specific tests including HTML, CSS, JavaScript, and more.</p>
              </div>
            </div>

            <div className='text-[#155DFC] flex justify-start gap-5 my-8'>
              <Text className='border border-[#155DFC] size-[40px] border-[2px] p-0.5'/>
              <div>
                <p className='font-semibold text-xl'>Smart Multi-Step Forms</p>
                <p className='font-semibold text-[#525457] leading'>Choose from specialized tracks like Frontend, Backend, and Mobile Development.</p>
              </div>
            </div>

          </div>
        
        </section>
  )
}
