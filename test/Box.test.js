const {
    accounts,
    contract
} = require('@openzeppelin/test-environment');
const {
    expect
} = require('chai');
const {
    BN,
    expectEvent,
    expectRevert
} = require('@openzeppelin/test-helpers');

const Box = contract.fromArtifact('Box');

describe('Box', function () {
    const [owner, other] = accounts;

    const value = new BN('42');

    beforeEach(async function () {
        this.contract = await Box.new({
            from: owner
        });
    });

    it('retrives returs a value previously stored', async function () {
        await this.contract.store(42, {
            from: owner
        });

        expect((await this.contract.retrieve())).to.be.bignumber.equal(value);
    });

    it('store emits an event', async function () {
        const receipt = await this.contract.store(value, { from: owner });

        expectEvent(receipt, 'ValueChanged', { newValue: value });
    });

    it('non owner cannot store a value', async function () {
        await expectRevert(
            this.contract.store(value, { from: other }),
            'Ownable: caller is not the owner'
        )
    })
})