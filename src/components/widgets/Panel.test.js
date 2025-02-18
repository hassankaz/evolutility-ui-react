import { render, screen, fireEvent } from "@testing-library/react";
import Panel from "./Panel";
import renderer from 'react-test-renderer';

describe('panel props test', ()=>{
    let panelToTest;
    const props = {
    title: "my panel",
    collapsible: true,
    width: 120,
    header: null,
    footer: null,
    children: null,
    className: null,
    };
    beforeEach(() =>{
    const testInstance = renderer.create(<Panel {...props} />);
    panelToTest = testInstance.root;
    });
    it('should render title in h3',()=>{
    const strongRender = panelToTest.findByType('h3');
    expect(strongRender.children).toEqual([props.title]);
    });
});

describe('panel widget tests', () => {
    it('test default props', ()=>{
    render(<Panel title={"My Panel"}  />);
    const panel = screen.getByTestId("panel-test");
    expect(panel).toHaveTextContent('My Panel'); 
    });
});