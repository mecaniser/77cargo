const StatsSection = () => {
  const stats = [
    { value: '500+', label: 'Deliveries Monthly' },
    { value: '50+', label: 'States Covered' },
    { value: '99%', label: 'On-Time Rate' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <section className="py-20 bg-cargo-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-display font-bold text-cargo-red mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

