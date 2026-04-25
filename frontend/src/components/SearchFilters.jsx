import FormInput from './FormInput'
import SelectInput from './SelectInput'

const SearchFilters = ({
  search,
  onSearch,
  typeFilter,
  onTypeFilter,
  statusFilter,
  onStatusFilter,
  locationFilter,
  onLocationFilter,
  sort,
  onSort,
}) => (
  <div className="paper-card scratched-border p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5 items-center">
    <FormInput
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search title or description..."
      className="w-full"
    />
    <SelectInput
      value={typeFilter}
      onChange={(e) => onTypeFilter(e.target.value)}
      className="w-full"
    >
      <option value="all">All Types</option>
      <option value="case">Cases</option>
      <option value="fiction">Stories</option>
    </SelectInput>
    <SelectInput
      value={statusFilter}
      onChange={(e) => onStatusFilter(e.target.value)}
      className="w-full"
    >
      <option value="all">All Status</option>
      <option value="solved">Solved</option>
      <option value="unsolved">Unsolved</option>
      <option value="under investigation">Under Investigation</option>
    </SelectInput>
    <FormInput
      value={locationFilter}
      onChange={(e) => onLocationFilter(e.target.value)}
      placeholder="Filter by location..."
      className="w-full"
    />
    <SelectInput
      value={sort}
      onChange={(e) => onSort(e.target.value)}
      className="w-full"
    >
      <option value="newest">Sort: Newest</option>
      <option value="oldest">Sort: Oldest</option>
      <option value="az">Sort: A-Z</option>
    </SelectInput>
  </div>
)

export default SearchFilters
