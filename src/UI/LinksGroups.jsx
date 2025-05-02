function LinksGroups({ children, isActive, onClick }) {
  return (
    <li
      onClick={onClick}
      className={
        isActive
          ? "bg-success hover:bg-success transition-colors cursor-pointer text-neutral rounded-lg text-xs  md:text-[1rem] whitespace-nowrap text-center"
          : "border border-success hover:bg-base-300 transition-colors cursor-pointer rounded-lg  text-xs  md:text-[1rem] whitespace-nowrap text-center"
      }
    >
      {children}
    </li>
  );
}

export default LinksGroups;
