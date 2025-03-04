
export interface Props {
  id: number
  question: string
  answer: string
}

const FrequentQuestionsAccordion = ({id, question, answer}: Props) => {
    return (
        <details className="group border border-green rounded-lg shadow-md" key={id}>
          <summary className="cursor-pointer flex items-center gap-3 p-4 rounded-lg text-lg font-medium transition-all duration-300">
          
          {/* Icono */}
          <svg className="w-5 h-5 transition-transform group-open:rotate-90 text-green " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          
          <span>{question}</span>
        </summary>
        <div className="p-4 text-gray-700">{answer}</div>
      </details>

    )
}

export default FrequentQuestionsAccordion;
