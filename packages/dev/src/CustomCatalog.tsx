import * as React from 'react';
import {
  QuickStart,
  QuickStartCatalog,
  QuickStartCatalogEmptyState,
  QuickStartCatalogFilterCountWrapper,
  QuickStartCatalogFilterSearchWrapper,
  QuickStartCatalogHeader,
  QuickStartCatalogSection,
  QuickStartCatalogToolbar,
  QuickStartContext,
  QuickStartContextValues,
  QuickStartTile,
  clearFilterParams,
  filterQuickStarts,
  getQuickStartStatus,
} from '@patternfly/quickstarts';
import {
  Divider,
  Gallery,
  GalleryItem,
  Text,
  TextContent,
  ToolbarContent,
} from '@patternfly/react-core';
import { allQuickStarts as yamlQuickStarts } from "./quickstarts-data/quick-start-test-data";
import { loadJSONQuickStarts } from "./quickstarts-data/mas-guides/quickstartLoader";

export const CustomCatalog: React.FC = () => {
  const { activeQuickStartID, allQuickStartStates, allQuickStarts, setAllQuickStarts, filter, setFilter } = React.useContext<QuickStartContextValues>(
    QuickStartContext,
  );

  React.useEffect(() => {
    // callback on state change
    setFilteredQuickStarts(filterQuickStarts(
      allQuickStarts,
      filter.keyword,
      filter.status.statusFilters,
      allQuickStartStates,
    ).sort(sortFnc),)
  }, [allQuickStarts]);

  const sortFnc = (q1: QuickStart, q2: QuickStart) =>
    q1.spec.displayName.localeCompare(q2.spec.displayName);

  const [filteredQuickStarts, setFilteredQuickStarts] = React.useState<QuickStart[]>(
    filterQuickStarts(
      allQuickStarts,
      filter.keyword,
      filter.status.statusFilters,
      allQuickStartStates,
    ).sort(sortFnc),
  );

  const onSearchInputChange = (searchValue: string) => {
    const result = filterQuickStarts(
      allQuickStarts,
      searchValue,
      filter.status.statusFilters,
      allQuickStartStates,
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setFilter('keyword', searchValue);
    setFilteredQuickStarts(result);
  };
  const onStatusChange = (statusList: string[]) => {
    const result = filterQuickStarts(
      allQuickStarts,
      filter.keyword,
      statusList,
      allQuickStartStates,
    ).sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName));
    setFilter('status', statusList);
    setFilteredQuickStarts(result);
  };

  const CatalogWithSections = (
    <>
      <QuickStartCatalogSection>
        <TextContent>
          <Text component="h2">Quick starts</Text>
          <Text component="p">Step-by-step instructions and tasks</Text>
        </TextContent>
        <Gallery className="co-quick-start-catalog__gallery" hasGutter>
          {allQuickStarts
            .filter(
              (quickStart) =>
                !quickStart.spec.type || quickStart.spec.type.text !== 'Documentation',
            )
            .map((quickStart) => {
              const {
                metadata: { name: id },
              } = quickStart;

              return (
                <GalleryItem key={id}>
                  <QuickStartTile
                    quickStart={quickStart}
                    isActive={id === activeQuickStartID}
                    status={getQuickStartStatus(allQuickStartStates, id)}
                  />
                </GalleryItem>
              );
            })}
        </Gallery>
      </QuickStartCatalogSection>
      <QuickStartCatalogSection>
        <Divider />
      </QuickStartCatalogSection>
      <QuickStartCatalogSection>
        <TextContent>
          <Text component="h2">Documentation</Text>
          <Text component="p">Technical information for using the service</Text>
        </TextContent>
        <Gallery className="co-quick-start-catalog__gallery" hasGutter>
          {allQuickStarts
            .filter((quickStart) => quickStart.spec.type?.text === 'Documentation')
            .map((quickStart) => {
              const {
                metadata: { name: id },
              } = quickStart;

              return (
                <GalleryItem key={id}>
                  <QuickStartTile
                    quickStart={quickStart}
                    isActive={id === activeQuickStartID}
                    status={getQuickStartStatus(allQuickStartStates, id)}
                  />
                </GalleryItem>
              );
            })}
        </Gallery>
      </QuickStartCatalogSection>
    </>
  );

  const clearFilters = () => {
    setFilter('keyword', '');
    setFilter('status', []);
    clearFilterParams();
    setFilteredQuickStarts(
      allQuickStarts.sort((q1, q2) => q1.spec.displayName.localeCompare(q2.spec.displayName)),
    );
  };

  // const load = async () => {
  //   const masGuidesQuickstarts = await loadJSONQuickStarts("");
  //   setAllQuickStarts(yamlQuickStarts.concat(masGuidesQuickstarts));
  // };

  // const loadQuickStarts = () => {
  //   load();
  // }

  return (
    <>
      <QuickStartCatalogHeader title="Resources" />
      <Divider component="div" />
      <QuickStartCatalogToolbar>
        <ToolbarContent>
          <QuickStartCatalogFilterSearchWrapper onSearchInputChange={onSearchInputChange} />
          {/* <QuickStartCatalogFilterStatusWrapper
            onStatusChange={onStatusChange}
          /> */}
          <QuickStartCatalogFilterCountWrapper quickStartsCount={filteredQuickStarts.length} />
        </ToolbarContent>
      </QuickStartCatalogToolbar>
      <Divider component="div" />
      {filteredQuickStarts.length === 0 ? (
        <QuickStartCatalogEmptyState clearFilters={clearFilters} />
      ) : filteredQuickStarts.length !== allQuickStarts.length ? (
        <QuickStartCatalogSection>
          <QuickStartCatalog quickStarts={filteredQuickStarts} />
        </QuickStartCatalogSection>
      ) : (
        CatalogWithSections
      )}
    </>
  );
};
