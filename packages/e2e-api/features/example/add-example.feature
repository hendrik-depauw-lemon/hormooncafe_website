@Example @AddExample
Feature: Add Example

  Background:
    Given I am logged in as a "SuperAdmin"

  Scenario: I should be able to add an example
    When I add an example
      | title       | my-example-title       |
      | description | my-example-description |
    Then I should not get an error for adding an example
    When I retrieve all examples
    And I should see an example with the following information
      | title       | my-example-title       |
      | description | my-example-description |

  Scenario: I should be able to add an example without a description
    When I add an example
      | title | my-example-title |
    Then I should not get an error for adding an example
    When I retrieve all examples
    And I should see an example with the following information
      | title       | my-example-title |
      | description | null             |
