interface JobPositionProps {
  title: string
  salary?: string
  location?: string
  experience?: string
  education?: string
  type?: string
  responsibilities?: string[]
  requirements?: string[]
}

export const JobPosition: React.FC<JobPositionProps> = ({
  title,
  salary,
  location,
  experience,
  education,
  type,
  responsibilities,
  requirements,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="mb-4 flex flex-wrap gap-4">
        {salary && (
          <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
            {salary}
          </span>
        )}
        {location && (
          <span className="rounded bg-green-100 px-2 py-1 text-green-800">
            {location}
          </span>
        )}
        {experience && (
          <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
            {experience}
          </span>
        )}
        {education && (
          <span className="rounded bg-purple-100 px-2 py-1 text-purple-800">
            {education}
          </span>
        )}
        {type && (
          <span className="rounded bg-red-100 px-2 py-1 text-red-800">
            {type}
          </span>
        )}
      </div>
      {responsibilities && (
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">工作职责：</h3>
          <ul className="list-inside list-disc space-y-1">
            {responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {requirements && (
        <div>
          <h3 className="mb-2 text-lg font-semibold">任职要求：</h3>
          <ul className="list-inside list-disc space-y-1">
            {requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
