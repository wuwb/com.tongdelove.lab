interface SoftwareItemProps {}

export const SoftwareItem = ({ software }: any) => {
  return (
    <div>
      <div className="software-card">
        <img src={software.icon} alt={software.title} />
        <h3>{software.title}</h3>
        <p>{software.description}</p>
      </div>
    </div>
  )
}
