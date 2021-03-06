const Dag = require('../dag')
require('chai').should();

describe('Clone Test', () => {
  describe('DAG(order=4, size=4)', () => {
    let dag
    let E

    beforeEach(() => {
      dag = new Dag()
      E = []
      E.push({from: 'a', to: 'b'})
      E.push({from: 'b', to: 'c'})
      E.push({from: 'd', to: 'b'})
      E.push({from: 'a', to: 'd'})
      E.forEach(e => dag.add(e.from, e.to))
    })

    it('should do shallow-clone', () => {
      const cloned = dag._clone()
      cloned.should.not.equal(dag)
      cloned._edges.should.not.equal(dag._edges)
      Object.keys(cloned._edges).forEach((key) => {
        cloned._edges[key].should.equal(dag._edges[key])
      })
    })

    it('should do deep-clone', () => {
      const cloned = dag._deepClone()
      cloned.should.not.equal(dag)
      cloned._edges.should.not.equal(dag._edges)
      Object.keys(cloned._edges).forEach((key) => {
        cloned._edges[key].should.not.equal(dag._edges[key])
        cloned._edges[key].forEach((e, index) => {
          e.should.not.equal(dag._edges[key][index])
          e.should.deep.equal(dag._edges[key][index])
        })
      })
    })
  })
})
