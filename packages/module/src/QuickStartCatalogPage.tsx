import * as React from 'react';
import {
  Button,
  Divider,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  Text,
  Title,
} from '@patternfly/react-core';
import { EmptyBox, LoadingBox, clearFilterParams } from '@console/internal/components/utils';
import { QuickStart } from './utils/quick-start-types';
import { QuickStartContext, QuickStartContextValues } from './utils/quick-start-context';
import { filterQuickStarts } from './utils/quick-start-utils';
import QuickStartCatalog from './catalog/QuickStartCatalog';
import QuickStartCatalogFilter from './catalog/Toolbar/QuickStartCatalogFilter';
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';

type QuickStartCatalogPageProps = {
  quickStarts?: QuickStart[];
  showFilter?: boolean;
  sortFnc?: (q1: QuickStart, q2: QuickStart) => number;
  title?: string;
  hint?: string;
  showTitle?: boolean;
};

export const QuickStartCatalogEmptyState = ({ clearFilters }) => {
  const { getResource } = React.useContext<QuickStartContextValues>(QuickStartContext);
  return (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        {getResource('No results found')}
      </Title>
      <EmptyStateBody>
        {getResource('No results match the filter criteria. Remove filters or clear all filters to show results.')}
      </EmptyStateBody>
      <EmptyStatePrimary>
        <Button variant="link" onClick={clearFilters} data-test="clear-filter button">
          {getResource('Clear all filters')}
        </Button>
      </EmptyStatePrimary>
    </EmptyState>
  );
};

export const QuickStartCatalogPage: React.FC<QuickStartCatalogPageProps> = ({
  quickStarts,
  showFilter,
  sortFnc = (q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName),
  title,
  hint,
  showTitle = true,
}) => {
  const { allQuickStarts = quickStarts, setAllQuickStarts, allQuickStartStates, getResource, filter, setFilter } = React.useContext<QuickStartContextValues>(QuickStartContext);

  React.useEffect(() => {
    if (quickStarts) {
      setAllQuickStarts(quickStarts);
    }
  }, [quickStarts]);
  
  const initialFilteredQuickStarts = showFilter
    ? filterQuickStarts(
        allQuickStarts,
        filter.keyword,
        filter.status.statusFilters,
        allQuickStartStates,
      ).sort(sortFnc)
    : allQuickStarts;

  const [filteredQuickStarts, setFilteredQuickStarts] = React.useState(initialFilteredQuickStarts);
  React.useEffect(() => {
    const filteredQuickStarts = showFilter
      ? filterQuickStarts(allQuickStarts, filter.keyword, filter.status.statusFilters, allQuickStartStates).sort(
          sortFnc,
        )
      : allQuickStarts;
    setFilteredQuickStarts(filteredQuickStarts);
  }, [allQuickStarts, allQuickStartStates]);

  const clearFilters = () => {
    setFilter('keyword', '');
    setFilter('status', []);
    clearFilterParams();
    setFilteredQuickStarts(
      allQuickStarts.sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName)),
    );
  };

  const onSearchInputChange = (searchValue) => {
    const result = filterQuickStarts(
      allQuickStarts,
      searchValue,
      filter.status.statusFilters,
      allQuickStartStates,
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setFilter('keyword', searchValue);
    setFilteredQuickStarts(result);
  };

  const onStatusChange = (statusList) => {
    const result = filterQuickStarts(
      allQuickStarts,
      filter.keyword,
      statusList,
      allQuickStartStates,
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setFilter('status', statusList);
    setFilteredQuickStarts(result);
  };

  if (!allQuickStarts) return <LoadingBox />;
  return allQuickStarts.length === 0 ? (
    <EmptyBox label={getResource('Quick Starts')} />
  ) : (
    <>
      {showTitle && (
        <div className="ocs-page-layout__header">
          <Text component="h1" className="ocs-page-layout__title" data-test="page-title">
            {title || getResource('Quick Starts')}
          </Text>
          {hint && <div className="ocs-page-layout__hint">{hint}</div>}
        </div>
      )}
      {showTitle && <Divider component="div" />}
      {showFilter && (
        <>
          <QuickStartCatalogFilter
            quickStartsCount={filteredQuickStarts.length}
            onSearchInputChange={onSearchInputChange}
            onStatusChange={onStatusChange}
          />
          <Divider component="div" />
        </>
      )}
      <>
        {filteredQuickStarts.length === 0 ? (
          <QuickStartCatalogEmptyState clearFilters={clearFilters} />
        ) : (
          <QuickStartCatalog quickStarts={filteredQuickStarts} />
        )}
      </>
    </>
  );
};
