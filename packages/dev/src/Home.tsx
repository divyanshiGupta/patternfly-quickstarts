import React from "react";
import { Button, PageSection, Stack, StackItem } from "@patternfly/react-core";
import {
  QuickStartContext
} from "@patternfly/quickstarts";
import i18n from './i18n/i18n';

export const Home: React.FunctionComponent = () => {
  // const [inputValue, setInputValue] = React.useState("");
  const { setResourceBundle } = React.useContext(QuickStartContext);

  // console.log(getQuickStartStatus(qsContext.allQuickStartStates, 'managing-business-central-data-sources-proc'));
  // console.log(getQuickStartStatusCount(qsContext.allQuickStartStates, qsContext.allQuickStarts));

  // const reloadQuickStart = () => {
  //   const updatedOptions = {
  //     attributes: {
  //       ...allAsciiDocImports.sampleA.options.attributes,
  //       CENTRAL: inputValue || "CENTRAL",
  //     },
  //   };
  //   qsContext.allQuickStarts[9] = ProcedureAsciiDocParser(
  //     allAsciiDocImports.sampleA.file,
  //     updatedOptions
  //   );
  //   openQuickStart();
  // };

  // const openQuickStart = () => {
  //   if (qsContext.activeQuickStartID) {
  //     qsContext.restartQuickStart(
  //       "managing-business-central-data-sources-proc",
  //       -1
  //     );
  //   } else {
  //     qsContext.setActiveQuickStart(
  //       "managing-business-central-data-sources-proc"
  //     );
  //   }
  // };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('bridge/language', lng);
    const resourceBundle = i18n.getResourceBundle(lng, 'quickstart');
    setResourceBundle(resourceBundle, lng);
  }

  return (
    <>
      <PageSection>
        <h1>Quick starts demo app</h1>
        <p>To view all quick starts, click the left "Quick Starts" nav item</p>
      </PageSection>
      <PageSection>
        <Stack hasGutter>
          <StackItem>
            <Button
              variant="secondary"
              onClick={() => changeLanguage("ja")}
              data-quickstart-id="change-lng-de"
            >
              Change lng - JA
            </Button>
          </StackItem>
          <StackItem>
            <Button
              variant="secondary"
              onClick={() => changeLanguage("en")}
              data-quickstart-id="change-lng-en"
            >
              Change lng - EN
            </Button>
          </StackItem>
          {/* <StackItem>
            <FormInput inputValue={inputValue} setInputValue={setInputValue} />
          </StackItem>
          <StackItem>
            <Button onClick={() => reloadQuickStart()} data-quickstart-id="reload-qs">
              Reload and toggle quick start 'Managing data sources'
            </Button>
          </StackItem> */}
        </Stack>
      </PageSection>
    </>
  );
};
