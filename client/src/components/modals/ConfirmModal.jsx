const ConfirmModal = () => {
  return (
    <div className="w-72 h-12 bg-white rounded-lg">
      Are you sure to delete this?
      <div className="text-white">
        <button className="bg-red-500 rounded-lg">OK</button>
        <button className="bg-cyan-300">Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
