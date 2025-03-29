
export interface Props {
  id: number
  question: string
  answer: string
}

const FrequentQuestionsAccordion = ({ id, question, answer }: Props) => {
  return (
    <details className="group border border-green-four rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.02] hover:bg-gray-100" key={id}>
      <summary className="cursor-pointer flex items-center gap-3 px-2 pt-2 pb-2 rounded-lg text-lg font-medium transition-all duration-300">
      
        {/* Icono */}
        <svg
          className="w-5 h-5 transition-transform group-open:rotate-90 text-green-four"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      
        <span>{question}</span>
      </summary>
      <div className="px-4 pb-4 text-gray-700">{answer}</div>
    </details>
  );
};


export default FrequentQuestionsAccordion;
