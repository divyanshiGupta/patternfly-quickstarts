import * as React from 'react';
import { shallow } from 'enzyme';
import { Popover, Text } from '@patternfly/react-core';
import QuickStartTileDescription from '../QuickStartTileDescription';
import { getQuickStarts } from '../../data/test-utils';

jest.mock('react', () => {
  const ActualReact = require.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => jest.fn(),
  };
});

describe('QuickStartCatalog', () => {
  beforeEach(() => {
    spyOn(React, 'useContext').and.returnValue({
      activeQuickStartID: '',
      startQuickStart: () => {},
      restartQuickStart: () => {},
      getResource: key => `quickstart~${key}`
    });
  });

  it('should show prerequisites only if provided', () => {
    // this quick start does not have prereqs
    const quickStart = getQuickStarts()[0].spec;
    const QuickStartTileDescriptionWrapper = shallow(
      <QuickStartTileDescription description={quickStart.description} />,
    );
    expect(QuickStartTileDescriptionWrapper.find(Text)).toHaveLength(0);
  });

  it('shoould render prerequisites inside a popover', () => {
    const quickStart = getQuickStarts()[2].spec;
    const QuickStartTileDescriptionWrapper = shallow(
      <QuickStartTileDescription
        description={quickStart.description}
        prerequisites={quickStart.prerequisites}
      />,
    );
    expect(QuickStartTileDescriptionWrapper.find(Popover)).toHaveLength(1);
  });
});
